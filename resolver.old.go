package graphql

import (
	"time"
	"api/gen"
	"api/util"
	"context"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Mutation() gen.MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() gen.QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) AddArtist(ctx context.Context, artistInput gen.ArtistInput) (*gen.Artist, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	
	col := util.Col("Artists")

	artistID := util.GenID(16)
	var albums []*gen.Album

	// iterate albumInputs & pass to AddAlbum reducer to return albums 
	for _, albumInput := range artistInput.Albums {
		album, err := r.AddAlbum(ctx, artistID, *albumInput)
		if err != nil {
			panic(err)
		}

		albums = append(albums, album)
	}

	user := r.User(ctx, artistInput.UserID)

	_, err := col.InsertOne(ctx, gen.Artist{
		ArtistID: artistID,
		UserID: *artistInput.UserID,
		Handle: user.Handle,
		Name: user.Name,
		JoinDate: time.Now().String(),
		BirthDate: artistInput.BirthDate,
		Albums: albums,
		Saved: []string,
		History: []string,
		FollowedArtists: []string,
	})

	if err != nil {
		panic(err)
	}
}
func (r *mutationResolver) RemArtist(ctx context.Context, artistID string) (string, error) {
	panic("not implemented")
}
func (r *mutationResolver) ModArtist(ctx context.Context, artistID string, artistInput gen.ArtistInput) (*gen.Artist, error) {
	panic("not implemented")
}
func (r *mutationResolver) AddUser(ctx context.Context, userInput gen.UserInput) (gen.User, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemUser(ctx context.Context, userID string) (string, error) {
	panic("not implemented")
}
func (r *mutationResolver) ModUser(ctx context.Context, userID string, userInput gen.UserInput) (gen.User, error) {
	panic("not implemented")
}
func (r *mutationResolver) AddAlbum(ctx context.Context, artistID string, albumInput gen.AlbumInput) (*gen.Album, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemAlbum(ctx context.Context, albumID string) (string, error) {
	panic("not implemented")
}
func (r *mutationResolver) ModAlbum(ctx context.Context, albumID string, albumInput gen.AlbumInput) (*gen.Album, error) {
	panic("not implemented")
}
func (r *mutationResolver) AddTrack(ctx context.Context, artistID string, trackInput gen.TrackInput) (*gen.Track, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemTrack(ctx context.Context, trackID string) (string, error) {
	panic("not implemented")
}
func (r *mutationResolver) ModTrack(ctx context.Context, trackID string, trackInput gen.TrackInput) (*gen.Track, error) {
	panic("not implemented")
}
func (r *mutationResolver) AddFavorite(ctx context.Context, userID string, trackID *string, albumID *string) (gen.Musical, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemFavorite(ctx context.Context, userID string, trackID *string, albumID *string) (gen.Musical, error) {
	panic("not implemented")
}
func (r *mutationResolver) AddFollowArtist(ctx context.Context, userID string, artistID string) (*gen.Artist, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemFollowArtist(ctx context.Context, userID string, artistID string) (*gen.Artist, error) {
	panic("not implemented")
}
func (r *mutationResolver) AddHistory(ctx context.Context, userID string, trackID string) (*gen.Track, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemHistory(ctx context.Context, userID string, trackID string) (*gen.Track, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Artists(ctx context.Context) ([]*gen.Artist, error) {
	panic("not implemented")
}
func (r *queryResolver) Artist(ctx context.Context, artistID string) (*gen.Artist, error) {
	panic("not implemented")
}
func (r *queryResolver) Album(ctx context.Context, artistID string) ([]*gen.Album, error) {
	panic("not implemented")
}
func (r *queryResolver) User(ctx context.Context, userID string) (gen.User, error) {
	panic("not implemented")
}
