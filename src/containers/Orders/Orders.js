import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import Address from "../../components/Order/Address";
import * as actions from "../../store/actions/index";
import {connect} from 'react-redux';
import Modal from "../../components/UI/Modal/Modal";

class Orders extends Component {

    state = {

        showAddress: false,
        address : null
    }

    componentDidMount()
    {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    showAddress = (address) => {

        this.setState({showAddress : true, address : address});

    }

    addressCancelHandler = () => {
        this.setState({showAddress : false});
    }

    deleteOrder = (orderId) => {

        this.props.onDeleteOrder(orderId, this.props.token);
    };

    render()
    {
        let address = null;

        if(this.state.showAddress){
            address = (

                <Address country = {this.state.address.country}
                street = {this.state.address.street}
                zipCode = {this.state.address.zipCode}/>
            );
        }

        let orders = this.props.orders.map(
            order => (

                <Order ingredients={order.ingredients} 
                price={order.price}
                key={order.id}
                addressButton={() => this.showAddress(order.orderData)}
                deleteButton={() => this.deleteOrder(order.id)}
                />
            )
        )

        if(this.props.loading)
        {
            orders = <Spinner/>
        }

        return(
            <div>
                 <Modal show = {this.state.showAddress}
                modalClosed = {this.addressCancelHandler}>
                    {address}
                </Modal>
                {orders}
            </div>
        );
        
    }
}

const mapStateToProps = state => {

    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {

    return {
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder : (orderId, token) => dispatch(actions.deleteOrder(orderId, token))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders,axios));