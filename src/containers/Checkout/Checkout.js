import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom";
import ContactData from "../ContactData/ContactData";
import {connect} from 'react-redux';

class Checkout extends Component{

    checkoutContinuedHandler = () => {

        this.props.history.replace("/checkout/contact-data");

    };

    checkoutCancelledHandler = () => {

        this.props.history.goBack();

    };

    render(){

        const purchasedRedirect = this.props.purchased ? <Redirect to = "/"/> : null;
        
        return(

            <div>
                
            {purchasedRedirect} 

            <CheckoutSummary ingredients = {this.props.ing}
            checkoutContinued = {this.checkoutContinuedHandler}
            checkoutCancelled = {this.checkoutCancelledHandler}/>

            <Route 
            path = {this.props.match.url + "/contact-data"}
            component = {ContactData} 
            />
        
            </div>
            
        );
    }

}

const mapStateToProps = state => {

    return {
        ing : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);