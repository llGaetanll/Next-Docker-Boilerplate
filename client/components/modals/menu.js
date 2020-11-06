import { MenuItem } from "@material-ui/core";

const MenuContent = props => {
  const handleClose = () => {};

  return (
    <>
      <MenuItem onClick={handleClose}>Profile</MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </>
  );
};

export default MenuContent;
