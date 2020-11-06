import gql from "graphql-tag";

export const GET_TODOS = {
  query: gql`
    query getTodos($first: Int!, $maxCount: Int!) {
      allTodos(first: $first, maxCount: $maxCount) {
        id
        title
        done
      }
    }
  `,
  variables: {
    first: 0,
    maxCount: 50
  }
};
