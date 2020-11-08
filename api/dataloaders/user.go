package dataloders

func UserLoader() *UserLoader {
	return &UserLoader{
		wait:     2 * time.Millisecond,
		maxBatch: 100,
		fetch: func(id []string) ([]*User, []error) {

			ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
			defer cancel()

			col := db.Col(db.Users)

			user, err := col.FindOne(ctx, gen.User{ID: id})

			return user, err
		}
	}
}
