import React, { Component } from 'react';
import { connect } from 'react-redux'
import CustomerList from '../customerList/customerList';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './HomePage.css';

const useStyles = makeStyles(theme => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }));

class HomePage extends Component {
    state = {
        open: false,
        first_Name: '',
        last_name: '',
        phone_number: ''
    }

    // componentDidMount(){
    //     console.log('');
    // }

    handleChangeFirstName = (e) => {
        console.log('first name and last name woriking', e.target.value);
        this.setState({
            first_Name: e.target.value
        })
    }
    handleChangeLastName = (e) => {
        console.log('first name and last name woriking', e.target.value);
        this.setState({
            last_name: e.target.value
        })
    }

    handleChangePhone = (e) => {
        console.log('customer phone', e.target.value);
        this.setState({
            phone_number: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log('submit customer info', this.state);
        this.props.dispatch({ type: 'POST_CUSTOMER', payload: this.state })
        this.setState({
            open: !this.state.open,
            first_Name: '',
            last_name: '',
            phone_number: ''
        })
        

    }

    addNew = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    render() {
        return (
            <>
                {/* <div>
                    <h1>what's up</h1>
                    {JSON.stringify(this.state)}
                </div> */}
                <div className="modal">
                <Modal
                aria-describedby="transition-modal-description"
                open={this.state.open}
                >
                    <div className= "modal-box">
                    {this.state.open && <>
                        <TextField 
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        placeholder='firstname' 
                        onChange={this.handleChangeFirstName} value={this.state.first_Name} />
                        <br></br>
                        <TextField 
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal" 
                        type='text' placeholder='lastname' 
                        onChange={this.handleChangeLastName} value={this.state.last_name} />
                        <br></br>
                        <TextField 
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        type='tel' placeholder='phone number' 
                        onChange={this.handleChangePhone} value={this.state.phone_number} />
                        <br></br>
                        <Button 
                        variant="contained" color="primary" 
                        onClick={this.handleSubmit}>Submit</Button>
                        </>
                        }
                        </div>
                    
                    </Modal>
                    </div>
                    <Button variant="contained" className='add-new' onClick={this.addNew}>Add New</Button>
                    <CustomerList />
                
                <div>
                    {/* <Router>
                    <Route path='/view' component={viewCustomer}/>
                </Router> */}
                    
                </div>
            </>
        );
    }
}
const mapStateToProps = state => ({
    state: state.first_Name,
    state: state.last_name,
    state: state.phone_number,
});

export default connect(mapStateToProps)(HomePage);