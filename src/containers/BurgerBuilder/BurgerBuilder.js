import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{

    state = {

        purchasing : false,

        loading : false,
    };

    
    componentDidMount()
    {
       this.props.onInitIngredients();
    }
    

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map((ingKey) => 
        {
            return ingredients[ingKey];
        })
        .reduce((sum,elem) => {
            return sum+elem;
        }, 0);

        return sum > 0;
        
    }

    purchaseHandler = () => {

        if(this.props.isAuthenticated)
        {
            this.setState({purchasing : true});
        }
        else
        {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    }

    purchaseCancelHandler = () => {

        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    render()
    {
        const disabledInfo = {...this.props.ing};

        for (let key in disabledInfo)
        {
            if(disabledInfo[key] <= 0)
            {
                disabledInfo[key] = true;
            }
            else
            {
                disabledInfo[key] = false;
            }
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Something is wrong</p> : <Spinner/>;

        if (this.props.ing)
        {
            burger = (

                <Aux>
                <Burger ingredients={this.props.ing}/>
    
                <BuildControls
                ingredientAdded = {this.props.onIngredientAdded}
                ingredientRemoved = {this.props.onIngredientRemoved}
                disabled = {disabledInfo}
                price = {this.props.price}
                purchasable = {this.updatePurchaseState(this.props.ing)}
                ordered = {this.purchaseHandler}
                isAuth={this.props.isAuthenticated}
                />
                </Aux>
    
            );

            orderSummary =  (<OrderSummary ingredients = {this.props.ing}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                />);

        }

        if(this.state.loading)
        {
            orderSummary = <Spinner/>;
        }

        return(

            <Aux>

            <Modal show = {this.state.purchasing}
            modalClosed = {this.purchaseCancelHandler}>

            {orderSummary}
  
            </Modal>  

            {burger}

            </Aux>

        );
    }
}

const mapStateToProps = state => {

    return {
        ing : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {

    return {

    onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),

    onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),

    onInitIngredients : () => dispatch(actions.initIngredient()),

    onInitPurchase : () => dispatch(actions.purchaseInit()),

    onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));