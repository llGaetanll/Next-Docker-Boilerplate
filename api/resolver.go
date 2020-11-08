package main

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

import (
	"context"
	"fmt"
	"time"

	"github.com/llGaetanll/DockerStarter-api/db"
	"github.com/llGaetanll/DockerStarter-api/gen"
)

type Resolver struct{}

func (r *mutationResolver) AddTodo(ctx context.Context, todoInput gen.TodoInput) (*gen.Todo, error) {

	// generate a new random TodoID for the todo
	id := db.GenID(db.Todos)

	// create the new todo
	todo := gen.Todo{
		TodoID:  id,
		Title:   todoInput.Title,
		Note:    *todoInput.Note,
		Created: time.Now(),
	}

	fmt.Println("new todo", todo)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// add the todo to the database
	db.Col(db.Todos).InsertOne(ctx, todo)

	return &todo, nil
}

func (r *mutationResolver) ModTodo(ctx context.Context, todoID string, todoInput gen.TodoInput) (*gen.Todo, error) {

	// assert that the todo is in the database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// the new todo
	todo := gen.Todo{
		Title: todoInput.Title,
		Note:  *todoInput.Note,
	}

	// add the todo to the database
	res := db.Col(db.Todos).FindOneAndUpdate(ctx, gen.Todo{TodoID: todoID}, todo)

	fmt.Println("modified todo", res)

	return &todo, nil
}

func (r *mutationResolver) RemTodo(ctx context.Context, todoID string) (*gen.Todo, error) {

	// assert that the todo is in the database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// add the todo to the database
	todo, err := db.Col(db.Todos).DeleteOne(ctx, gen.Todo{TodoID: todoID})

	if err != nil {
		return nil, err
	}

	fmt.Println("deleted todo", todo)

	return nil, nil
}

func (r *mutationResolver) AddUser(ctx context.Context, userInput gen.UserAdd) (*gen.User, error) {

	// generate a new random TodoID for the todo
	id := db.GenID(db.Users)

	// create the new user
	user := gen.User{
		UserID:   id,
		Admin:    false,
		UserName: userInput.UserName,
		Handle:   userInput.Handle,
		JoinTime: time.Now(),
	}

	fmt.Println("new user", user)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// add the todo to the database
	db.Col(db.Users).InsertOne(ctx, user)

	return &user, nil
}

func (r *mutationResolver) ModUser(ctx context.Context, userID string, userInput gen.UserMod) (*gen.User, error) {

	// assert that the todo is in the database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// the new user
	user := gen.User{
		Handle:   *userInput.Handle,
		UserName: *userInput.Handle,
		Admin:    *userInput.Admin,
	}

	// add the todo to the database
	res := db.Col(db.Todos).FindOneAndUpdate(ctx, gen.User{UserID: userID}, user)

	fmt.Println("modified user", res)

	return &user, nil
}

func (r *mutationResolver) RemUser(ctx context.Context, userID string) (*gen.User, error) {

	// assert that the todo is in the database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// add the user to the database
	todo, err := db.Col(db.Users).DeleteOne(ctx, gen.User{UserID: userID})

	if err != nil {
		return nil, err
	}

	fmt.Println("deleted user", todo)

	return nil, nil
}

func (r *queryResolver) User(ctx context.Context, userInput gen.UserQuery) (*gen.User, error) {

	// assert that the todo is in the database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// add the user to the database
	user := db.Col(db.Users).FindOne(ctx, gen.User{
		UserID:   *userInput.UserID,
		Handle:   userInput.Handle,
		UserName: *userInput.UserName,
		JoinTime: userInput.JoinTime,
	})

	fmt.Println("found user", user)

	return nil, nil
}

func (r *queryResolver) Todo(ctx context.Context, todoInput gen.TodoInput) (*gen.Todo, error) {

	// assert that the todo is in the database
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// get the todo from the database
	var todo *gen.Todo

	db.Col(db.Users).FindOne(ctx, gen.Todo{
		Title: todoInput.Title,
		Note:  *todoInput.Note,
	}).Decode(todo)

	fmt.Println("found todo", todo)

	return todo, nil
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() gen.MutationResolver { return &mutationResolver{r} }

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
