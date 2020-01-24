import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';

class OrderList extends Component {

    componentDidMount() {
        this.getAllOrder();
    }
    getAllOrder = ()=> {
        this.props.dispatch({ type: "GET_CUSTOMER_ORDER", payload: this.props.match.params});
    }

    deletePurchase = (id) => {
        console.log('in delete button', id);
        
        this.props.dispatch({ type: 'DELETE_PURCHASE', payload: {id: id}})
        console.log('in purchase delete items---------', id);
    }

    render() {
        return (
            <div>
                {/* <h1>OrderList</h1> */}
                {/* {JSON.stringify(this.props.reduxState.orders)}  */}
                <section>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell scope="col">Date</TableCell>
                            <TableCell scope="col">Total</TableCell>
                            <TableCell scope="col">Paid</TableCell>
                            <TableCell scope="col">Option</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.reduxState.orders.map( (item) =>
                            <TableRow key= {item.id}>
                                <td>{item.date}</td>
                                <td>${item.total}</td>
                                <td>${item.paid}</td>
                                <DeleteIcon variant="contained" color= '#f8bbd0' onClick={() => this.deletePurchase(item.id)}>Delete</DeleteIcon>
                            </TableRow>)}
                    </TableBody>
                </Table>
            </section>
            </div>
        );
    }
}
const putReduxStateonProps = (reduxState) => ({
    reduxState
  })

export default withRouter(connect(putReduxStateonProps) (OrderList));