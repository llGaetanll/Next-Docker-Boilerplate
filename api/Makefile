# run hot reloading environment in development build
dev: gen main.go resolver.go
	air

# run production build
prod: build start

build:
	go build -o api

start:
	./api

# generate graphql models & bson tags for generated structs
gen:
	go run github.com/99designs/gqlgen generate
	go run hooks/bson.go

# remove generated files
clean:
	rm -r gen tmp
