import React, { useEffect, useState } from 'react'
import { useApiGet } from '../hooks/useApiGet'
import { useStyles, StyledTableCell } from '../styles/styles'

// Material Ui table import
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import TableRowComponent from './TableRow';
import { getColor } from './TableRow/utils';

import { Checkbox, Grid, Typography } from '@material-ui/core';



function Index() {

  const classes = useStyles();
  const data = useApiGet();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState(["warning", "error", "success"]);
  const [appliedFilterType, setAppliedFilterType] = useState(["cy:", "cons:"]);


  useEffect(() => {
    // this function runs whenever const data is changed
    // (useApiGet() has done its job and data is set to the fetched json)
    setFilteredData(data)
  }, [data]);

  useEffect(() => {
    // whenever there is a change in appliedFilter or appliedFilterType state (checkbox is clicked) 
    // or when there is a change in search state (something is written/deleted in search input)
    // this function runs
    filterSearch(search)
  }, [appliedFilter, appliedFilterType, search]);

  const filterSearch = (search) => {
    // first we filter data according to what is written in search input
    let searchResults = data;

    if (search !== "") {
      searchResults = searchResults.filter((item) => {

        if (item.type.toLowerCase().includes(search.toLowerCase())) {
          return item;
        } else if (item.message.toLowerCase().includes(search.toLowerCase())) {
          return item;
        } else if (item.severity.toLowerCase().includes(search.toLowerCase())) {
          return item;
        }
      })
    }
    // after that we apply the checkbox filters
    setFilteredData(searchResults.filter((item) =>


      appliedFilter.includes(item.severity))
      .filter((item) =>

        appliedFilterType.some(filterType =>
          item.type.startsWith(filterType)
        )))
  }

  const applyFilter = (filter) => {
    // we set the appliedFilter state to whatever it is plus the value from the checkbox that was checked
    setAppliedFilter(old => [...old, filter])
  }

  const removeFilter = (filter) => {
    // we set the appliedFilter state to whatever it is minus the checkbox that was checked
    setAppliedFilter(old => [...old.filter((value) => value !== filter)])
  }

  const applyFilterType = (filter) => {
    // we set the appliedFilterType state to whatever it is plus the value from the checkbox that was checked
    setAppliedFilterType(old => [...old, filter])
  }

  const removeFilterType = (filter) => {
    // we set the appliedFilterType state to whatever it is minus the checkbox that was checked
    setAppliedFilterType(old => [...old.filter((value) => value !== filter)])
  }

  return (
    <div>
      <Grid container spacing={1} className="tableContainer">
        <Grid item xs={12}>
          {/* 
          onChange for the checkboxes(ternary operator):
          if the checkbox gets activated it calls on the applyFilter() with event target value
          otherwise it calls on the removeFilter() with event target value 
          either way the appliedFilter state gets changed hence the second useEffect (iflterSearch function) gets triggered 
          and filteredData gets updated
          */}
          <label>errors</label><Checkbox value='error' checked={appliedFilter.includes("error")} color="primary" onChange={(e, checked) => checked ? applyFilter(e.target.value) : removeFilter(e.target.value)}></Checkbox>
          <label>warnings</label><Checkbox value='warning' checked={appliedFilter.includes("warning")} color="primary" onChange={(e, checked) => checked ? applyFilter(e.target.value) : removeFilter(e.target.value)}></Checkbox>
          <label>successes</label><Checkbox value='success' checked={appliedFilter.includes("success")} color="primary" onChange={(e, checked) => checked ? applyFilter(e.target.value) : removeFilter(e.target.value)}></Checkbox>
          {/* 
          onChange for the search field:
          search state gets changed and therefore the second useEffect (filterSearch function) gets triggered 
          and filteredData gets updated
          */}
          <input type="text" placeholder="search here" onChange={e => setSearch(e.target.value)} />

          <label>cy</label><Checkbox value="cy:" color="primary" checked={appliedFilterType.includes("cy:")} onChange={(e, checked) => checked ? applyFilterType(e.target.value) : removeFilterType(e.target.value)}></Checkbox>
          <label>cons</label><Checkbox value="cons:" color="primary" checked={appliedFilterType.includes("cons:")} onChange={(e, checked) => checked ? applyFilterType(e.target.value) : removeFilterType(e.target.value)}></Checkbox>
        </Grid>

        <Grid item xs={12} className="tableBody">
          <TableHead >
            <TableRow>
              <Typography variant="h6">lets the first user create a conversation</Typography>

            </TableRow>
          </TableHead>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell align="right">Severity</StyledTableCell>
                <StyledTableCell align="left">Message</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .map((item, b) => {
                  return (
                    <TableRowComponent key={b} type={item.type} severity={item.severity} message={item.message} color={getColor(item)} />
                  );
                })}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </div>
  );
}

export default Index
