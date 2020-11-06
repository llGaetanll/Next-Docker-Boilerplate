import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// User
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 0,
    height: "min-content",

    margin: theme.spacing(2),
    padding: theme.spacing(1)
  },
  login: {
    display: "flex",
    flex: 1,
    minHeight: 40,
    margin: theme.spacing(1),

    fontFamily: "Product Sans",
    fontWeight: 700,
    textTransform: "none",

    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
    color: "#fff",
    boxShadow: `0 0 10px ${theme.palette.primary.light}99`
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    maxWidth: 250
  },
  logOut: {
    fontSize: "1.1em",
    color: theme.palette.grey[700],
    fontFamily: "Product Sans",
    fontWeight: 500,
    textTransform: "capitalize",
    transitionDuration: 0.2,
    "&:hover": {
      background: "transparent",
      color: theme.palette.primary.main
    }
  }
}));

export default ({ profile }) => {
  const classes = useStyles();

  const handleLogin = async data => {};
  const handleError = data => {};

  return (
    <Box className={classes.root}>
      {/* if user is logged in, display profile */}
      {profile ? (
        <Box className={classes.userInfo}>
          <Profile info={profile} size={"small"} />
        </Box>
      ) : (
        <Button className={classes.login} onClick={handleLogin}>
          Login
        </Button>
      )}
    </Box>
  );
};

// Profile
const PROFILE_STYLE = {
  small: {
    size: 30,
    nameSize: "1.3em",
    handleSize: "0.8em",
    hideHandle: true,
    margin: 5
  },
  medium: {
    size: 41,
    nameSize: "1.1em",
    handleSize: "0.9em",
    margin: 6
  },
  large: {
    size: 50,
    nameSize: "1.3em",
    margin: 7
  }
};

const useProfileStyles = makeStyles(theme => ({
  root: ({ margin }) => ({
    margin
  }),
  avatar: ({ size }) => ({
    width: size,
    height: size
  }),
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: theme.spacing(1)
  },
  name: ({ nameSize }) => ({
    fontSize: nameSize,
    whiteSpace: "nowrap",
    fontWeight: 600
  }),
  handle: ({ handleSize, hideHandle }) => ({
    display: hideHandle ? "none" : "flex",
    fontSize: handleSize,
    fontWeight: 500,
    opacity: 0.8,
    whiteSpace: "nowrap"
  })
}));

export const Profile = ({ info, size, style }) => {
  const classes = useProfileStyles(PROFILE_STYLE[size || "small"]);

  const { avatar, name, handle } = info;

  return (
    <Box display="flex" className={classes.root} style={style}>
      <Avatar src={avatar} className={classes.avatar} alt="avatar" />
      {(name || handle) && (
        <Box display="flex" className={classes.userInfo}>
          {name && (
            <Typography component="h1" variant="h3" className={classes.name}>
              {name}
            </Typography>
          )}
          {handle && (
            <Typography component="h2" className={classes.handle}>
              @{handle}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
