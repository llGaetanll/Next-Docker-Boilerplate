package api

import (
	"app/api/auth"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/graph-gophers/graphql-go"
)

// Start starts the api running on port 3000
func Start(schema *graphql.Schema) {
	r := gin.Default()

	r.Use(sessions.Sessions("goquestsession", auth.Store))

	// use our schema for this route
	r.POST("/api", graphqlHandler(schema))

	a := r.Group("/auth")
	a.GET("/url/:service", auth.GetURL)    // returns the url for the session
	a.POST("/user/:service", auth.GetUser) // returnns information about the user given the token
	// a.POST("/google", auth.AuthHandler) // returnns information about the user given the token in the headers

	r.Run(":3000")
}

// aug 30 2018 tummy tuesday
