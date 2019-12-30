package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

// Start starts the api running on port 3000
func Start(schema *graphql.Schema) {
	r := mux.NewRouter()

	r.Handle("/api", &relay.Handler{Schema: schema}).Methods("POST") // use our schema for this route

	fmt.Println("Running API on port 3000")
	log.Fatal(http.ListenAndServe(":3000", r))
}
