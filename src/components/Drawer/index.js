import React from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

const DrawerComponent = ({
  classesDrawer,
  open,
  handleDrawerClose,
  theme,
  data,
}) => {
  return (
    <>
      <Drawer
        className={classesDrawer.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classesDrawer.drawerPaper,
        }}
      >
        <div className={classesDrawer.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.keys(data).map((filename) =>
            Object.keys(data[filename]).map((testName) => (
              <ListItem
                button
                key={testName}
                component="a"
                href={`#${testName}`}
              >
                <ListItemText primary={testName} />
              </ListItem>
            ))
          )}
        </List>
        <Divider />
        <List>
          <ListItem button component="a" href={`#top`}>
            <ListItemText primary={"to top"} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
