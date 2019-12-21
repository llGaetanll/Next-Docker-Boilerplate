package api

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func API() {
	r := mux.NewRouter()

	fmt.Println("Hello World from API")

	// TODO: protect all routes behind api key in some parameter routes

	// Users
	// r.HandleFunc("/api/user/account/add/{token}", user.AddAccount).Methods("POST") // add new user to database
	// r.HandleFunc("/api/user/get/{token}", user.Get).Methods("POST")                // Get public info about a user given their tokenID
	// r.HandleFunc("/api/user/char/add", user.AddChar).Methods("POST")               // add char to user specific charset
	// r.HandleFunc("/api/user/char/rem", user.RemChar).Methods("POST")               // rem char from user specific charset
	// r.HandleFunc("/api/user/char/upd", user.UpdChar).Methods("POST")               // upd weights of charset

	// // CharSet
	// r.HandleFunc("/api/char/new", char.New).Methods("POST")       // Creates a new CharSet and adds all character-value pairs in the body to it
	// r.HandleFunc("/api/char/add", char.Add).Methods("POST")       // Adds a list of characters to a CharSet given its CharSetID (would expect json body with chars and values)
	// r.HandleFunc("/api/char/rem", char.Rem).Methods("POST")       // Removes a list of characters from a CharSet given its CharSetID (would expect json body with chars and values)
	// r.HandleFunc("/api/char/bind", char.Bind).Methods("POST")     // Adds a character-value pair to a charset given a CharsetID (expects a json body with a character-value pair)
	// r.HandleFunc("/api/char/unbind", char.Unbind).Methods("POST") // Removes a character-value pair from a CharSet given an ID of the character (the character can only be removed by the original creator of the charset)
	// r.HandleFunc("/api/char/get", char.Get).Methods("POST")       // Returns a charset to a user given a CharSetID
	// r.HandleFunc("/api/char/info", char.Info).Methods("POST")     // Retuns the info about a particular charset given a charSetID
	// r.HandleFunc("/api/char/upd", char.Upd).Methods("POST")       // Updates a CharSet given a CharSetID and a json format of the new charcters

	// // Debug
	// r.HandleFunc("/api/debug/test", debug.Test).Methods("POST")                        // adding a / at the very end of the route breaks it, be careful
	// r.HandleFunc("/api/debug/getUsers", debug.GetUsers).Methods("POST")                // returns a list of users in json format
	// r.HandleFunc("/api/debug/showCollection/{collection}", debug.Show).Methods("POST") // Displays collection, limits to 50 results
	// r.HandleFunc("/api/debug/dropCollection/{collection}", debug.Drop).Methods("POST") // removes a collection from mongodb [WARNING: This action cannot be undone]
	// r.HandleFunc("/api/debug/listCollection", debug.ListCollection).Methods("POST")    // Lists all collections

	fmt.Println("Running API on port 3000") // TODO: template string this
	http.ListenAndServe("3000", r)          // container port
}
