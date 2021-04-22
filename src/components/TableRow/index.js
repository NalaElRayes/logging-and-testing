import React from 'react';
import { StyledTableRow, StyledTableCell } from './styles';

// const Test = () => <div>hej</div>;
// const Test2 = () => { return <div>hej</div>}
// const Test3 = () => (<div>hej</div>)

const TableRowComponent = ({ severity, message, type, color, ...rest }) => {
    
    return (<StyledTableRow style={{ backgroundColor: color }} {...rest}>
    <StyledTableCell component="th" scope="row">
      {type}
    </StyledTableCell>
    <StyledTableCell align="right">{severity}</StyledTableCell>
    <StyledTableCell align="left">{message}</StyledTableCell>
  </StyledTableRow>)
};

export default TableRowComponent;