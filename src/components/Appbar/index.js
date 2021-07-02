import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Filter from "../Filter/index";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const AppBarComponent = ({
  search,
  setSearch,
  appliedFilter,
  appliedFilterType,
  onCheckboxChanged,
  onCheckboxChangedType,
  classesDrawer,
  open,
  handleDrawerOpen,
}) => {
  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classesDrawer.appBar, {
          [classesDrawer.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(
              classesDrawer.menuButton,
              open && classesDrawer.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography id="#top" variant="h5" noWrap>
            Logviewer
          </Typography>
          <Filter
            search={search}
            appliedFilter={appliedFilter}
            appliedFilterType={appliedFilterType}
            onSearchChange={(searchString) => setSearch(searchString)}
            onCheckboxChanged={onCheckboxChanged}
            onCheckboxChangedType={onCheckboxChangedType}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppBarComponent;
