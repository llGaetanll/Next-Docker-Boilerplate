package main

import (
	"os"

	db "github.com/llGaetanll/DockerStarter-api/db"
	gen "github.com/llGaetanll/DockerStarter-api/gen"

	"github.com/99designs/gqlgen/handler"
	"github.com/gin-gonic/gin"
)

// Defining the Graphql handler
func graphqlHandler() gin.HandlerFunc {
	// NewExecutableSchema and Config are in the generated.go file
	// Resolver is in the resolver.go file
	h := handler.GraphQL(gen.NewExecutableSchema(gen.Config{Resolvers: &Resolver{}}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
	h := handler.Playground("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

// the default port that the server runs on
const defaultPort = "8080"

func main() {
	// if PORT environment variable is defined
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Default creates a gin router with default middleware:
	// 	logger and recovery (crash-free) middleware
	r := gin.Default()

	// all routes require a connection to the database,
	// hence we use a middleware to assert this connection
	r.Use(db.AssertDatabase())

	// /query handles any GraphQL requests
	r.POST("/query", graphqlHandler())

	// / handles the playground in development
	r.GET("/", playgroundHandler())

	// run server on defined port
	r.Run(":" + port)
}
