import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import OrderList from '../OrderList/OrderList';
import Button from '@material-ui/core/Button';
import './viewCustomer.css';

class viewCustomer extends Component {

    state = {
        date: '',
        total: '',
        paid: '',
        option: '',
        edit: false,
        first_Name: '',
        last_name: '',
        phone_number: '',
        
    }

    componentDidMount() {
        this.getCustomer();
    }
    
    getCustomer = () => {
        this.props.dispatch({ type: "GET_CUSTOMER", payload: this.props.match.params});
    }

    editCustomer = () => {
        console.log('in edit customer');
        // this.props.dispatch({type: `EDIT_CUSTOMER`, payload: this.state});
        this.setState({
            edit: true
        })
    }

    saveCustomer = () => {
        this.props.dispatch({type: `EDIT_CUSTOMER`, 
        payload: {
            first_name: this.state.first_Name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            id: this.props.reduxState.veiwCustomer[0].id
        }});
        this.setState({
            edit: false,
            first_Name: '',
            last_name: '',
            phone_number: ''
        })
    }

    handleChangeFirst = (e) =>{
        console.log('edit first name', e.target.value);
        this.setState({
            first_Name: e.target.value,
        })
    }
    handleChangeLast = (e) =>{
        console.log('edit last name', e.target.value);
        this.setState({
            last_name: e.target.value,
        })
    }
    handleChangeContact = (e) =>{
        console.log('edit phone', e.target.value);
        this.setState({
            phone_number: e.target.value,
        })
    }

    addPurchase = (id) => {
        console.log('in customer purchase button', id);
        this.props.dispatch({ type: "ADD_ORDER", payload: {customer_id:id}})
        // 
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.reduxState.newOrder !== prevProps.reduxState.newOrder) {
            this.props.history.push(`/purchase/${this.props.reduxState.newOrder.id}`);
        }
      }

    render() {

        const edit = this.state.edit === false ? (
            <>
            <div>
                <h1>View Customer</h1>
                {/* {JSON.stringify(this.props.reduxState.veiwCustomer)} */}
                {/* {JSON.stringify(this.props.reduxState)} */}
                {/* {JSON.stringify(this.props.veiwCustomer)} */}
            </div>
                <div>
                    {this.props.reduxState.veiwCustomer.map( (item) =>
                    <div key= {item.id}>
                        <p>First Name: {item.first_name}</p>
                        <p>Last Name: {item.last_name}</p>
                        <p>Phone Number: {item.phone_number}</p>
                        <Button variant="contained" color="primary" onClick={this.editCustomer}>Edit</Button>
                        <br></br>
                        <Button className='button' variant="contained" color="primary" onClick={() => this.addPurchase(item.id)}>Purchase</Button>
                        </div>)}
                        <br></br>
                </div>
                {/* <Button variant="contained" color="primary" onClick={this.editCustomer}>Edit</Button> */}
                <hr></hr>
            <br></br>
            <OrderList/>
            </>
        ) : (
            <>
            <p></p>
            <input placeholder='First Name' onChange={this.handleChangeFirst} value={this.state.first_Name}  />
            <input placeholder='Last Name' onChange={this.handleChangeLast} value={this.state.last_name} />
            <input placeholder='Phone Number' onChange={this.handleChangeContact} value={this.state.phone_number}/>
            <button onClick={this.saveCustomer}>Save</button>
            </>
        )

        return (
            // <>
            // <div>
            //     <h1>View Customer</h1>
            //     {JSON.stringify(this.props.reduxState.veiwCustomer)}
            // </div>
            //     <div>
            //         {this.props.reduxState.veiwCustomer.map( (item) =>
            //         <div key= {item.id}>
            //             <p>Name:{item.first_name}</p>
            //             <p>First Name:{item.last_name}</p>
            //             <p>Phone Number:{item.phone_number}</p>
            //             <button onClick={() => this.addPurchase(item.id)}>Purchase</button>
            //             </div>)}
                        
            //     </div>
            <div>
                {edit}
                {/* {JSON.stringify('adsfasdfasdfasfdsafa', this.state)} */}
                {/* <input placeholder='First Name' onChange={this.handleChangeFirst}></input>
                <input placeholder='Last Name' onChange={this.handleChangeLast}></input>
                <input placeholder='Phone Number' onChange={this.handleChangeContact}></input> */}
            
            </div>
            // <br></br>
            // <OrderList/>
            // </>
        );
    }
}
const putReduxStateonProps = (reduxState) => ({
    reduxState
  })

export default withRouter(connect(putReduxStateonProps) (viewCustomer));