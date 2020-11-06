import React, { useContext } from "react";

import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "../src/layout";

import { FeedbackContext } from "../util/feedback";

import TodoInput from "../components/modals/todoInput";
import TodoList from "../components/todolist";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 150,
    fontFamily: "Roboto",
    margin: theme.spacing(1)
  }
}));

const Index = () => {
  const classes = useStyles();
  const { setDialog } = useContext(FeedbackContext);

  const handleDialog = () =>
    setDialog(
      <TodoInput />,
      data => {
        console.log("dialog close callback", data);
      },
      { override: true }
    );

  return (
    <Layout>
      <Box className={classes.content}>
        <Button
          className={classes.button}
          onClick={handleDialog}
          variant="outlined"
        >
          Add Todo
        </Button>
        <TodoList />
      </Box>
    </Layout>
  );
};

export default Index;
