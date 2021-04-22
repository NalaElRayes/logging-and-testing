import React, { useEffect, useState } from 'react'
import { useApiGet } from '../hooks/useApiGet'
import { useStyles, StyledTableCell, StyledTableRow } from '../styles/styles'
// Material Ui table import
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';

//Radio button import

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TableRowComponent from './TableRow';
import {getColor} from './TableRow/utils';



function Index() {

  const classes = useStyles();
  // const [data, setData] = useState([]);
  //
  const [search, setSearch] = useState("");
  const data = useApiGet();
  const [filteredData, setFilteredData] = useState([]);
  
  //radio button
  const [value, setValue] = React.useState('all');

  const handleChange = (event) => {
    setValue(event.target.value);
  };




  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const filterSearch = (search) => {

    setFilteredData(data.filter((item) => {
      if (search === "") {
        return item;
      } else if (item.type.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }else if (item.message.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }else if (item.severity.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    }))
  }


  return (
    <div>


      <div>
        <h4>lets the first user write a message in the first conversation</h4>
        {/*Search field*/}
        <input type="text" placeholder="search here" onChange={e => {
          filterSearch(e.target.value)
        }}>
        </input>

        <FormControl row= {true}component="fieldset">
          <FormLabel component="legend">Filter</FormLabel>
          <RadioGroup row={true} aria-label="filter" name="filter1" value={value} onChange={handleChange}>
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="error" control={<Radio />} label="Error" />
            <FormControlLabel value="warning" control={<Radio />} label="Warning" />
            <FormControlLabel value="succcess" control={<Radio />} label="Success" />
          </RadioGroup>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
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
                let color = getColor(item);
              
                return (
                  <TableRowComponent key={b} type={item.type} severity={item.severity} message={item.message} color={color} />
                  /*
                  <StyledTableRow key={b} style={{ backgroundColor: color }}>
                    <StyledTableCell component="th" scope="row">
                      {item.type}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.severity}</StyledTableCell>
                    <StyledTableCell align="left">{item.message}</StyledTableCell>
                  </StyledTableRow>
                  */
                );
              })}


          </TableBody>
        </Table>
      </TableContainer>



    </div>
  );

} 

export default Index

