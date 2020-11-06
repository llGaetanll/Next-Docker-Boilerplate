import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  todolist: {},
  todo: {}
}));

export const ALL_TODOS_QUERY = gql`
  query allTodos($max: Int!) {
    allTodos(orderBy: created, max: $max) {
      id
      title
      note
      created
    }
  }
`;
export const allTodosVariables = {
  max: 10
};

const Todo = ({ name, note }) => {
  return (
    <Box className={classes.todo}>
      <Typography component="h1" variant="h3">
        {name}
      </Typography>
      <Typography>{note}</Typography>
    </Box>
  );
};

const TodoList = () => {
  const classes = useStyles();

  const { loading, error, data } = useQuery(ALL_TODOS_QUERY, {
    variables: allTodosVariables
  });

  if (error) return <Box>error loading todos</Box>;
  if (loading) return <Box>loading todos...</Box>;

  const { todos } = data;

  return (
    <Box className={classes.todolist}>
      {todos.map(todo => (
        <Todo name={todo.name} note={todo.note} />
      ))}
    </Box>
  );
};

export default TodoList;
