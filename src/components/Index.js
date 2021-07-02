import React, { useState } from "react";
import { useStyles1, StyledTableCell } from "./TableRow/styles";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import DrawerComponent from "./Drawer";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid } from "@material-ui/core";
import ReactList from "react-list";
import TableRowComponent from "./TableRow";

import { getColor } from "./TableRow/utils";
import { useApiGet } from "../hooks/useApiGet";
import Filter from "./Filter";
import { filterSearch } from "./utils";

function Index() {
  const data = useApiGet();
  const classes = useStyles1();
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState([
    "warning",
    "error",
    "success",
  ]);
  const [appliedFilterType, setAppliedFilterType] = useState(["cy:", "cons:"]);

  const onCheckboxChanged = (e, checked) => {
    checked ? applyFilter(e.target.value) : removeFilter(e.target.value);
  };

  const onCheckboxChangedType = (e, checked) => {
    checked
      ? applyFilterType(e.target.value)
      : removeFilterType(e.target.value);
  };

  const applyFilter = (filter) => {
    // we set the appliedFilter state to whatever it is plus the value from the checkbox that was checked
    setAppliedFilter((old) => [...old, filter]);
  };

  const removeFilter = (filter) => {
    // we set the appliedFilter state to whatever it is minus the checkbox that was checked
    setAppliedFilter((old) => old.filter((value) => value !== filter));
    console.log("applied filter: " + appliedFilter);
  };

  const applyFilterType = (filter) => {
    // we set the appliedFilterType state to whatever it is plus the value from the checkbox that was checked
    setAppliedFilterType((old) => [...old, filter]);
  };

  const removeFilterType = (filter) => {
    // we set the appliedFilterType state to whatever it is minus the checkbox that was checked
    // setAppliedFilterType(old => [...old.filter((value) => value !== filter)])
    setAppliedFilterType((old) => old.filter((value) => value !== filter));
  };

  //Drawer
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));

  const classesDrawer = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classesDrawer.root}>
        <CssBaseline />
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

        <DrawerComponent
          classesDrawer={classesDrawer}
          open={open}
          handleDrawerClose={handleDrawerClose}
          theme={theme}
          data={data}
        />

        <main
          className={clsx(classesDrawer.content, {
            [classesDrawer.contentShift]: open,
          })}
        >
          <div className={classesDrawer.drawerHeader} />
          <Grid container spacing={1} className="tableContainer">
            <Grid item xs={12}>
              {Object.keys(data).map((fileName) => {
                return (
                  <>
                    {Object.keys(data[fileName]).map((testName) => {
                      // om data fileName, testname är tom (if) skriv ut ett message det finns inga tabeller.
                      const testLogArray = filterSearch(
                        search,
                        data[fileName][testName],
                        appliedFilter,
                        appliedFilterType
                      );

                      const renderTableRow = (index, key) => {
                        const currentTestLog = testLogArray[index];
                        return (
                          <TableRowComponent
                            key={key}
                            type={currentTestLog.type}
                            severity={currentTestLog.severity}
                            message={currentTestLog.message}
                            color={getColor(currentTestLog)}
                          />
                        );
                      };

                      const renderTableBody = (items, ref) => {
                        return <TableBody ref={ref}>{items}</TableBody>;
                      };

                      //om testLogArray innehåller testloggar rendera tabel
                      if (Object.keys(testLogArray).length > 0) {
                        return (
                          <>
                            <Grid item xs={12} className="tableBody">
                              <Typography variant="h6" id={testName}>
                                {testName}
                              </Typography>
                              <Table
                                className={classes.table}
                                aria-label="customized table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>Type</StyledTableCell>
                                    <StyledTableCell align="left">
                                      Severity
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                      Message
                                    </StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <ReactList
                                  itemRenderer={renderTableRow}
                                  itemsRenderer={(items, ref) =>
                                    renderTableBody(items, ref)
                                  }
                                  length={testLogArray.length}
                                />
                              </Table>
                            </Grid>
                          </>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </>
                );
              })}
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  );
}

export default Index;
