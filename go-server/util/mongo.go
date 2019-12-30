package util

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func init() {
	clientOptions := options.Client().ApplyURI("mongodb://mongodb:27017")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	DB, _ = mongo.Connect(ctx, clientOptions)
}
