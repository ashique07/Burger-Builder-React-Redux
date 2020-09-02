import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component
{

    render()
    {
        const ingredientSummary = Object.keys(this.props.ingredients).map(

            (ingKey) => {
    
            return (
            
                <li key={ingKey} >
    
                <span style = {{textTransform : 'capitalize'}}>{ingKey}</span> : {this.props.ingredients[ingKey]} 
                
                </li>);
    
            }
        );

        return (

            <Aux>
            <h3>Your order</h3>
            <p>Your burger ingredients - </p>
            <ul>
            {ingredientSummary}
            </ul>
            <Button btnType = "Danger" clicked = {this.props.purchaseCancelled}>Cancel</Button>
            <Button btnType = "Success" clicked = {this.props.purchaseContinued}>Continue</Button>
            </Aux>

        );
    }
} 

export default OrderSummary;