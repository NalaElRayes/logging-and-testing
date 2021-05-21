import React, { useEffect, useState } from "react";
// import data from "./1bubbleHistory.json";
import { useStyles, StyledTableCell } from "./TableRow/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Grid, Typography } from "@material-ui/core";
import TableRowComponent from "./TableRow";
import { getColor } from "./TableRow/utils";
import { useApiGet } from "../hooks/useApiGet";
import Filter from "./Filter";

function Index() {
  const data = useApiGet();
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState([
    "warning",
    "error",
    "success",
  ]);
  const [appliedFilterType, setAppliedFilterType] = useState(["cy:", "cons:"]);

  const filterSearch = (search, logArray) => {
    // first we filter data according to what is written in search input
    let searchResults = logArray;
    search = search.toLowerCase();

    if (search !== "") {
      searchResults = searchResults.filter((testLog) => {
        let type = testLog.type.toLowerCase();
        let message = testLog.message.toLowerCase();
        let severity = testLog.severity.toLowerCase();

        if (
          type.includes(search) ||
          message.includes(search) ||
          severity.includes(search)
        ) {
          return testLog;
        }
      });
    }
    return searchResults
      .filter((testLog) => appliedFilter.includes(testLog.severity))
      .filter((testLog) =>
        appliedFilterType.some((filterType) =>
          testLog.type.startsWith(filterType)
        )
      );
  };

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

  return (
    <div>
      <Grid container spacing={1} className="tableContainer">
        <Grid item xs={12}>
          <Filter
            search={search}
            appliedFilter={appliedFilter}
            appliedFilterType={appliedFilterType}
            onSearchChange={(searchString) => setSearch(searchString)}
            onCheckboxChanged={onCheckboxChanged}
            onCheckboxChangedType={onCheckboxChangedType}
          />
        </Grid>
        <Grid item xs={12}>
          {Object.keys(data).map((fileName) => {
            return (
              <>
                {Object.keys(data[fileName]).map((testName) => {
                  // om data fileName, testname är tom (if) skriv ut ett message det finns inga tabeller.
                  const testLogArray = filterSearch(
                    search,
                    data[fileName][testName]
                  );

                  console.log(testLogArray);
                  console.log(typeof testLogArray);
                  console.log(Object.keys(testLogArray).length);
                  //om testLogArray innehåller testloggar rendera tabel om ej returnera en paragraph med text "det finns inga testloggar i denna tabel"
                  if (Object.keys(testLogArray).length > 0) {
                    return (
                      <>
                        <Grid item xs={12} className="tableBody">
                          <Typography variant="h6">{testName}</Typography>
                          <Table
                            className={classes.table}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <TableRow>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell align="right">
                                  Severity
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                  Message
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {testLogArray.map((testLog, index) => {
                                const { type, severity, message } = testLog;

                                return (
                                  <TableRowComponent
                                    key={index}
                                    type={testLog.type}
                                    severity={testLog.severity}
                                    message={testLog.message}
                                    color={getColor(testLog)}
                                  />
                                );
                              })}
                            </TableBody>
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
    </div>
  );
}

export default Index;
