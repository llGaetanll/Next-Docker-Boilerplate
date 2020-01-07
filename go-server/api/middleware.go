package api

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/graph-gophers/graphql-go"
)

func graphqlHandler(schema *graphql.Schema) gin.HandlerFunc {
	return func(c *gin.Context) {
		var params struct {
			Query         string                 `json:"query"`
			OperationName string                 `json:"operationName"`
			Variables     map[string]interface{} `json:"variables"`
		}

		// decode the request in the body
		if err := json.NewDecoder(c.Request.Body).Decode(&params); err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}

		// execute query on schema and marshal response
		response := schema.Exec(c.Request.Context(), params.Query, params.OperationName, params.Variables)

		// return json response
		c.JSON(http.StatusOK, response)
	}
}
