package util

import (
	"crypto/rand"
	"encoding/base64"
)

// GenBytes generates a slice of length l of random bytes
func GenBytes(l int) []byte {
	b := make([]byte, l)
	rand.Read(b)

	return b
}

// GenID generates random IDs
func GenID(l int) string {
	return base64.StdEncoding.EncodeToString(GenBytes(l))
}
