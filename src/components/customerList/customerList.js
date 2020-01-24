import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

class customerList extends Component {

    componentDidMount() {
        this.getAllCustomer();
    }

    getAllCustomer = ()=> {
        this.props.dispatch({ type: "GET_ALL_CUSTOMER"});
    }

    viewButton = (id) => {
        console.log('in customerlist', id);
        
        this.props.history.push(`/view/${id}`);
    }

    render() {
        return (
            <>
                <div>
                {/* {JSON.stringify(this.props.reduxState.customer)} */}
                <h1>Table</h1>
                </div>
                <section>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>first_name</StyledTableCell>
                                <StyledTableCell>last_name</StyledTableCell>
                                <StyledTableCell>phone_number</StyledTableCell>
                                <StyledTableCell>Veiw</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.reduxState.customer.map( (item) =>
                            <TableRow key= {item.id}>
                                <StyledTableCell>{item.first_name}</StyledTableCell>
                                <StyledTableCell>{item.last_name}</StyledTableCell>
                                <StyledTableCell>{item.phone_number}</StyledTableCell>
                                <button onClick={() => this.viewButton(item.id)}>Veiw</button>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </section>
            
            </>
        );
    }
}
const putReduxStateonProps = (reduxState) => ({
    reduxState
  })

export default withRouter(connect(putReduxStateonProps)(customerList));