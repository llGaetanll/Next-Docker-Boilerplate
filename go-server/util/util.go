package util

import (
	"crypto/rand"
	"log"
)

func genBytes(length int) []byte {
	b := make([]byte, length)
	_, err := rand.Read(b)

	if err != nil {
		log.Fatal(err)
	}

	return b
}
