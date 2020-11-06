import { makeStyles } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";
import Sidebar from "../components/sidebar";

// Default Layout
const useStyles = makeStyles(theme => ({}));

export default ({ children }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flex={1} flexDirection="row">
      <Sidebar />
      <Box display="flex" flex={1} flexDirection="column">
        {children}
      </Box>
    </Box>
  );
};

// Phone Layout
const usePhoneStyles = makeStyles(theme => ({}));

export const PhoneLayout = ({ children }) => {
  const classes = usePhoneStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Tabs />
      {children}
    </Box>
  );
};

// const useSideStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//   },
// }));

// export const SideLayout = (props) => {
//   const classes = useSideStyles();

//   const { children } = props;
//   return (
//     <Box display="flex" flexDirection="column" style={{ overflow: "hidden" }}>
//       <Box display="flex" flexDirection="row" className={classes.root}>
//         <Sidebar />
//         <Box
//           display="flex"
//           flexDirection="column"
//           flex="1 1"
//           justifyContent="center"
//         >
//           {children}
//         </Box>
//       </Box>
//     </Box>
//   );
// };
