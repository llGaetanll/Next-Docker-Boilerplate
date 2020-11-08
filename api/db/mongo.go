package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// The eternal guide to Mongo Go Driver. Let this be your bible
// https://www.mongodb.com/blog/post/mongodb-go-driver-tutorial

// DB is the database object
var DB *mongo.Client

// Database string name
const Database string = "TodoApp"

// collection names as variables to prevent accidentally creating collections from misspells

// Users collection string name
const Users string = "Users"

// Todos collection string name
const Todos string = "Todos"

const ctxTimeSecond int = 5

// ran on load, connect to the database
func init() {
	// database option
	clientOptions := options.Client().ApplyURI("mongodb://mongodb:27017")

	// allow up to 10 seconds to attempt a connection to the database
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	DB, _ = mongo.Connect(ctx, clientOptions)
}

// Col is a helper to easilly get a collection object given its name
func Col(col string) *mongo.Collection {
	return DB.Database(Database).Collection(col)
}
