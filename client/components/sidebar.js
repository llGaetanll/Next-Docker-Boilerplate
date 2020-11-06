import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import User from "./user";

const useStyles = makeStyles(theme => ({
  sidebarWrapper: {
    display: "flex",
    flexDirection: "column",

    width: 250,
    zIndex: 100
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",

    width: "inherit",
    height: "100vh"
  }
}));

const Sidebar = props => {
  const classes = useStyles();

  return (
    <Box className={classes.sidebarWrapper}>
      <Box className={classes.sidebar}>
        <User />
      </Box>
    </Box>
  );
};

export default Sidebar;
