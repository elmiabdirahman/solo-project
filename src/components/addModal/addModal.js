import React, { Component } from 'react';

class addModal extends Component {

    state = {
        open: false,
        first_Name: '',
        last_name: '',
        phone_number: ''
    }

    addNew = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    render() {
        return (
            <div>
                {this.state.open && <>
                        <input type='text' placeholder='firstname' onChange={this.handleChangeFirstName} value={this.state.first_Name} />
                        <input type='text' placeholder='lastname' onChange={this.handleChangeLastName} value={this.state.last_name} />
                        <input type='tel' placeholder='phone number' onChange={this.handleChangePhone} value={this.state.phone_number} />
                        <button onClick={this.handleSubmit}>Submit</button>
                        </>
                }
            </div>
        );
    }
}

export default addModal;