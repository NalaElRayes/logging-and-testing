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

//Table Ui
// const StyledTableCell = withStyles((theme) => ({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   }))(TableCell);

//   const StyledTableRow = withStyles((theme) => ({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   }))(TableRow);

//   const useStyles = makeStyles({
//     table: {
//       minWidth: 700,
//     },
//   });

function Index() {

  const classes = useStyles();
  // const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const data = useApiGet();
  const [filteredData, setFilteredData] = useState([]);

  // const apiGet = () => {
  // fetch('./test.json')
  //   .then(response => response.json())
  //   .then((json) => {
  //     console.log(json);
  //     setData(json);
  //   });

  // };


  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const filterSearch = (search) => {

    setFilteredData(data.filter((item) => {
      if (search == "") {
        return item;
      } else if (item.message.toLowerCase().includes(search.toLowerCase())) {
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
                let color
                switch (item.severity) {
                  case "success":
                    color = "green"
                    break;
                  case "warning":
                    color = "yellow"
                    break;
                  default:
                    color = "red"
                }
                return (
                  <StyledTableRow key={b} style={{ backgroundColor: color }}>
                    <StyledTableCell component="th" scope="row">
                      {item.type}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.severity}</StyledTableCell>
                    <StyledTableCell align="left">{item.message}</StyledTableCell>
                  </StyledTableRow>
                );
              })}


          </TableBody>
        </Table>
      </TableContainer>



    </div>
  );

}
// style = {{backgroundColor: item.severity === "success" ? "green" : item.severity === "warning" ?  "yellow" : "red" }}  

export default Index

