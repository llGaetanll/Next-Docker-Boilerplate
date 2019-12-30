package main

import (
	"app/api"
	"app/util"
	"io/ioutil"

	"github.com/graph-gophers/graphql-go"
)

func main() {
	// Read and parse the schema:
	bstr, err := ioutil.ReadFile("./schema.graphql")
	if err != nil {
		panic(err)
	}

	// Schema holds our parsed graphql schema
	Schema := graphql.MustParseSchema(string(bstr), &util.Resolver{})

	// start the API on port 3000
	api.Start(Schema)
}
