package util

import (
	"app/src"
	"context"
	"time"

	"github.com/graph-gophers/graphql-go"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Resolver struct{}

type BookResolver struct {
	b *src.Book
}

// Book resolves a book in the database
func (r *Resolver) Book(args struct{ BookID graphql.ID }) (*BookResolver, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	col := DB.Database(src.Database).Collection("Books")

	var book src.Book
	err := col.FindOne(ctx, src.Book{BookID: args.BookID}).Decode(&book)

	if err != nil {
		return nil, err
	}

	return &BookResolver{&book}, nil
}

// Books resolves books in the database
func (r *Resolver) Books(args struct{ AuthorID graphql.ID }) ([]*BookResolver, error) {
	author, err := r.Author(args)
	// if we can't find the author
	if author == nil || err != nil {
		return nil, err
	}

	return author.Books() // here we're calling the `Books` resolver, defined somewhere below
}

// Authors resolves all authors in the database
func (r *Resolver) Authors() ([]*AuthorResolver, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	col := DB.Database(src.Database).Collection("Authors")

	cursor, err := col.Find(ctx, bson.D{{}}, options.Find().SetLimit(50))

	if err != nil {
		return nil, err
	}

	var authorRes []*AuthorResolver
	for cursor.Next(ctx) {
		var author src.Author
		cursor.Decode(&author)

		authorRes = append(authorRes, &AuthorResolver{&author})
	}

	return authorRes, nil
}

// Author resolves an author in the database
func (r *Resolver) Author(args struct{ AuthorID graphql.ID }) (*AuthorResolver, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	col := DB.Database(src.Database).Collection("Authors")

	var author src.Author
	err := col.FindOne(ctx, src.Author{AuthorID: args.AuthorID}).Decode(&author)

	if author == (src.Author{}) || err != nil {
		return nil, err
	}

	return &AuthorResolver{&author}, nil
}

type CreateBookArgs struct {
	AuthorID graphql.ID
	Book     struct {
		Title string
	}
}

// CreateBook lets you add a book to an author
func (r *Resolver) CreateBook(args CreateBookArgs) (*BookResolver, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	col := DB.Database(src.Database).Collection("Books")

	bookID := genBytes(16)
	isbn := genBytes(16) // this is not a valid isbn but it's okay for the sake of example

	book := src.Book{
		BookID: graphql.ID(bookID),
		Author: args.AuthorID,
		Title:  args.Book.Title,
		ISBN:   string(isbn),
	}

	col.InsertOne(ctx, book)

	return &BookResolver{&book}, nil
}

type AuthorResolver struct{ a *src.Author }

type CreateAuthorArgs struct {
	FirstName string
	LastName  string
	Age       uint8
}

// CreateAuthor lets you add an author to the database
func (r *Resolver) CreateAuthor(args CreateAuthorArgs) (*AuthorResolver, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	col := DB.Database(src.Database).Collection("Authors")

	authorID := genBytes(16)

	author := src.Author{
		AuthorID:  graphql.ID(authorID),
		FirstName: args.FirstName,
		LastName:  args.LastName,
		Age:       args.Age,
	}

	col.InsertOne(ctx, author)

	return &AuthorResolver{&author}, nil
}

// AuthorID Resolves the authorid of the author
func (r *AuthorResolver) AuthorID() graphql.ID {
	return r.a.AuthorID
}

// FirstName Resolves the first name of the author
func (r *AuthorResolver) FirstName() string {
	return r.a.FirstName
}

// LastName Resolves the last name of the author
func (r *AuthorResolver) LastName() string {
	return r.a.LastName
}

// Age Resolves the age of the author
func (r *AuthorResolver) Age() int32 {
	return int32(r.a.Age)
}

// Books resolves books given an AuthorID
func (r *AuthorResolver) Books() ([]*BookResolver, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	col := DB.Database(src.Database).Collection("Books")

	var books []*BookResolver
	cursor, err := col.Find(ctx, src.Book{Author: r.a.AuthorID}) // here we query the database for the books with `AuthorID` as `r.a.AuthorID`, based on the resolver

	if !cursor.Next(ctx) || err != nil {
		return nil, err
	}

	var book src.Book
	for cursor.Next(ctx) {
		cursor.Decode(&book)
		books = append(books, &BookResolver{&book})
	}

	if book == (src.Book{}) {
		return nil, nil
	}

	return books, nil
}

// BookID resolves the ID of the book
func (r *BookResolver) BookID() graphql.ID {
	return r.b.BookID
}

// Title resolves the title of the book
func (r *BookResolver) Title() string {
	return r.b.Title
}

// ISBN resolves the isbn of the book
func (r *BookResolver) ISBN() string {
	return r.b.ISBN
}
