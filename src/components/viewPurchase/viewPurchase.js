import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
// import ItemList from '../ItemList/ItemList';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete'

class viewPurchase extends Component {
    state = {
        open: false,
        order_id: '',
        item: '',
        price: '',
        total: '',
        paid: ''
        // option: ''
    }
    componentDidMount() {
        this.getPurchases();
    }
    
    getPurchases = () => {
        this.props.dispatch({ type: "GET_ORDER", payload: this.props.match.params});
        this.setState({
            order_id: this.props.match.params
        })
    }

    handleItem = (e) => {
        console.log("tem for customer", e.target.value);
        this.setState({
            item: e.target.value
        })
    }
    handlePrice = (e) => {
        console.log("price for customer", e.target.value);
        this.setState({
            price: e.target.value
        })
    }
    handleAdd = () =>{
        console.log('adding purchases', this.state);
        this.props.dispatch({ type: 'ADD_ITEMS', payload: this.state})
        this.setState({
            item: '',
            price: '',
        })
    }
    //deleting item
    deleteItem = (id) => {
        this.props.dispatch({ type: 'DELETE_ITEM', payload: {id: id, order_id: this.state.order_id}})
        console.log('in Item delete', id);
    }
    
    //modal for purchase
    handlePaid = (e) => {
        console.log('in handle paid input', e.target.value);
        this.setState({
            paid: e.target.value
        })
    }
    handleCheckOut = () =>{
        console.log('Check Out for items');
        this.props.dispatch({ type: "EDIT_CHECKOUT", payload: {
            id: this.props.match.params.id, 
            total: this.state.total,
            paid: this.state.paid,
         }});
        this.setState({
            open: !this.state.open,
        })
    }
    handleSubmit = () => {
        
        let total = 0
        for (let i = 0; i < this.props.reduxState.items.length; i++) {
            if (this.props.reduxState.items[i]) {
                total+= Number(this.props.reduxState.items[i].price)
            }
        }
        console.log('this is total', total);
        
        this.setState({
            open: !this.state.open,
            total: total
        })
    }

    render() {
        return (
            <>
            <div>
                <h1>item page</h1>
                {/* {JSON.stringify(this.props.reduxState)} */}
                {this.props.reduxState.veiwCustomer.map( (item) =>
                    <div key= {item.id}><p>Name : {item.first_name} {item.last_name}</p>
                </div>)}
            </div>
            
            <div>Add Item: 
                <input placeholder='Item' onChange={this.handleItem} value={this.state.item}></input>
                <input placeholder='price' onChange={this.handlePrice} value={this.state.price}></input>
                <button onClick={this.handleAdd}>Add</button>
            </div>
            {/* {JSON.stringify(this.props.reduxState.items)}; */}
            <section>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell>price</TableCell>
                                <TableCell>option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {this.props.reduxState.items.map( (item) =>
                                <TableRow key= {item.id}>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>${item.price}</TableCell>
                                    <>
                                    <DeleteIcon variant="contained" color="secondary" onClick={() => this.deleteItem(item.id)}>Delete</DeleteIcon>
                                    </>
                                </TableRow>)}
                        </TableBody>
                    </Table>
                    <div className="modal">
                <Modal
                aria-describedby="transition-modal-description"
                open={this.state.open}
                >
                    <div className= "modal-box">
                    {this.state.open && <>
                        <p>Total: $ {this.state.total}</p>
                        <input type='text' placeholder='$' onChange={this.handlePaid} value={this.state.paid}></input>
                        <br></br>
                        {/* {JSON.stringify(this.props.reduxState.newOrder)} */}
                        <button 
                        variant="contained" color="primary" 
                        onClick={this.handleCheckOut}>Check Out</button>
                        </>
                        }
                        </div>
                    
                    </Modal>
                    </div>
                    <Button variant="outlined" color="primary"onClick={this.handleSubmit}>Submit</Button>
                </section>
            {/* <ItemList /> */}
            </>
        );
    }
}
const putReduxStateonProps = (reduxState) => ({
    reduxState
  })

export default withRouter(connect(putReduxStateonProps) (viewPurchase));