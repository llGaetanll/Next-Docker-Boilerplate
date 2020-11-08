package db

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

const idLength int = 32

// GenBytes generates a slice of length l of random bytes
func genBytes(l int) []byte {
	b := make([]byte, l)
	rand.Read(b)

	return b
}

// GenID generates random IDs of length `isLength`
// given type t
func GenID(t string) string {
	b := genBytes(idLength)
	s := base64.StdEncoding.EncodeToString(b) // string

	// shorten and lowercase c
	// TODO: check that t is one of the mongo collections
	t = strings.ToLower(t)

	return fmt.Sprintf("%s-%s", t, s)
}

// GetMongoCtx returns a context used for querying the database
func GetMongoCtx() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), time.Duration(ctxTimeSecond)*time.Second)
}

// AssertDatabase is a gin middleware used in routes that require a connection to the database
func AssertDatabase() gin.HandlerFunc {
	return func(c *gin.Context) {
		// assert that connection to the database was successful
		// allow up to 2 seconds to attempt ping the database
		ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer cancel()
		err := DB.Ping(ctx, nil)

		if err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())

			return
		}

		c.Next()
	}
}
