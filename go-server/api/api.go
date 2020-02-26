package api

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/graph-gophers/graphql-go"
)

// Start starts the api running on port 3000
func Start(schema *graphql.Schema) {
	r := gin.Default()

	store := cookie.NewStore([]byte("secret"))
	r.Use(sessions.Sessions("goquestsession", store))

	// use our schema for this route
	r.POST("/", graphqlHandler(schema))

	r.GET("/api/test", func(c *gin.Context) {
		fmt.Println("Detected Test Request")
		c.JSON(200, gin.H{
			"hello": "world",
		})
	})

	a := r.Group("/auth")
	a.GET("/url/:service", GetURL)    // returns the url for the session
	a.POST("/user/:service", GetUser) // returnns information about the user given the token
	// a.POST("/google", auth.AuthHandler) // returnns information about the user given the token in the headers

	r.Run(":3000")
}
