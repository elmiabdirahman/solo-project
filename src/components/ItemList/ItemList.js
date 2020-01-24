import React, { Component } from 'react';

class ItemList extends Component {

    componentDidMount() {
        this.getItems();
    }

    getItems = () => {
        // this.props.dispatch({ type: "GET_ALL_ITEM"});
    }

    render() {
        return (
            <>
                <section>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>price</th>
                                <th>option</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </section>
            </>
        );
    }
}

export default ItemList;