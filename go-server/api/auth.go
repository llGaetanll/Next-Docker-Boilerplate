package auth

import (
	"app/util"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"

	"golang.org/x/oauth2/facebook"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
	"golang.org/x/oauth2/instagram"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

type config struct {
	CID          string   `json:"cid"`
	CSecret      string   `json:"csecret"`
	RedirectURL  string   `json:"redirectURL"`
	Scopes       []string `json:"scopes"`
	UserEndpoint string   `json:"userEndpoint"`
}

// type googleUser struct {
// 	Sub           string `json:"sub"`
// 	Name          string `json:"name"`
// 	GivenName     string `json:"given_name"`
// 	FamilyName    string `json:"family_name"`
// 	Profile       string `json:"profile"`
// 	Picture       string `json:"picture"`
// 	Email         string `json:"email"`
// 	EmailVerified bool   `json:"email_verified"`
// 	Gender        string `json:"gender"`
// }

var conf *oauth2.Config

func getConfig(service string) (*config, error) {
	file, err := ioutil.ReadFile("./api/config.json")

	if err != nil {
		return nil, err
	}

	var fileStr map[string]config
	json.Unmarshal(file, &fileStr)

	conf := fileStr[service]

	if conf.CID == "" {
		return nil, errors.New("oauth2 service unavailable")
	}

	return &conf, nil
}

// GetURL returns the url for the authentication button
func GetURL(c *gin.Context) {
	service := c.Param("service")

	// set session token
	token := util.GenID(32)
	session := sessions.Default(c)
	session.Set("token", token)
	session.Save()

	cnfg, err := getConfig(service)

	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	conf = &oauth2.Config{
		ClientID:     cnfg.CID,
		ClientSecret: cnfg.CSecret,
		RedirectURL:  cnfg.RedirectURL,
		Scopes:       cnfg.Scopes,
	}

	switch service {
	case "google":
		(*conf).Endpoint = google.Endpoint
	case "facebook":
		(*conf).Endpoint = facebook.Endpoint
	case "instagram":
		(*conf).Endpoint = instagram.Endpoint
	case "github":
		(*conf).Endpoint = github.Endpoint
	default:
		c.AbortWithError(http.StatusBadRequest, errors.New("oauth2 service unavailable"))
		return
	}

	url := conf.AuthCodeURL(token)

	// return url
	c.JSON(200, gin.H{
		"url": url,
	})
}

func GetUser(c *gin.Context) {
	service := c.Param("service")
	cnfg, err := getConfig(service)

	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	// check if token is still valid
	session := sessions.Default(c)
	token := session.Get("token")

	// if the token in the header does not match the one stored in the session
	if token != c.GetHeader("token") {
		c.AbortWithError(http.StatusUnauthorized, fmt.Errorf("invalid token %s", token))
		return
	}

	// get token given an authorization code
	tok, err := conf.Exchange(context.Background(), c.Query("code"))
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	client := conf.Client(context.Background(), tok)
	resp, err := client.Get(cnfg.UserEndpoint) // url for example can be `https://www.googleapis.com/oauth2/v3/userinfo` for google
	if err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	defer resp.Body.Close()
	userObj, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	c.JSON(200, userObj)
}
