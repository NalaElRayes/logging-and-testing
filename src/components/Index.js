import React, { useEffect, useState } from 'react'
import { useApiGet } from '../hooks/useApiGet'
import { useStyles, StyledTableCell} from '../styles/styles'

// Material Ui table import
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


//Radio button import

import TableRowComponent from './TableRow';
import { getColor } from './TableRow/utils';
import { Checkbox, Grid, Typography } from '@material-ui/core';



function Index() {

  const classes = useStyles();
  const [search, setSearch] = useState("");
  const data = useApiGet();
  const [searchedData, setSearchedData] = useState([]);





  useEffect(() => {
    setSearchedData(data);
  }, [data]);

  const filterSearch = (search) => {

    setSearchedData(data.filter((item) => {
      if (search === "") {
        return item;
      } else if (item.type.toLowerCase().includes(search.toLowerCase())) {
        return item;
      } else if (item.message.toLowerCase().includes(search.toLowerCase())) {
        return item;
      } else if (item.severity.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    }))
  }



  const filterError = () => {
    //funktion som tar in searchedData eftersom den behöver filtrera sökningsresultatet
    console.log("funktion call")
  }


  return (
    <div>

      <Grid container spacing={1} className="tableContainer">
        <Grid item xs={12}>
          <label>error</label><Checkbox color="primary" onChange={()=>filterError()}></Checkbox>
          <label>warning</label><Checkbox color="primary"></Checkbox>
          <label>info</label><Checkbox color="primary"></Checkbox>
          
          <input type="text" placeholder="search here" onChange={e => {
            filterSearch(e.target.value)
          }} />



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
              {searchedData
                .map((item, b) => {
                  let color = getColor(item);

                  return (
                    <TableRowComponent key={b} type={item.type} severity={item.severity} message={item.message} color={color} />
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

