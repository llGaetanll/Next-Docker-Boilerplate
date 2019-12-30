package src

import "github.com/graph-gophers/graphql-go"

// Here we'll define all of our structs for our GraphQL server
// I chose to do the classic Book/Author example because its
// simple to understand and easy to adapt

// Book defines what it means to be a book
type Book struct {
	BookID graphql.ID
	Author graphql.ID
	Title  string
	ISBN   string
}

// Author defines what is means to be an author
type Author struct {
	AuthorID  graphql.ID
	FirstName string
	LastName  string
	Age       uint8
}
