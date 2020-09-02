import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const ctrl = [

    {label : "MEAT", type : "meat"},
    {label : "SALAD", type : "salad"},
    {label : "CHEESE", type : "cheese"},
    {label : "BACON", type : "bacon"}
];

const buildControls = (props) => {

    return (

        <div className={classes.BuildControls} >

            <p><strong>Current Price : {props.price.toFixed(2)}</strong></p>

            {ctrl.map(ingredient => (

                <BuildControl

                label = {ingredient.label}
                key = {ingredient.label}
                added = {() => props.ingredientAdded(ingredient.type)}
                removed = {() => props.ingredientRemoved(ingredient.type)}
                disabled = {props.disabled[ingredient.type]}
                
                ></BuildControl>
            )
        
            )}

            <button onClick = {props.ordered} disabled = {!props.purchasable} className = {classes.OrderButton}>
            {props.isAuth ? "ORDER NOW" : "SIGNUP TO CONTINUE"}
            </button>

        </div>

    );

}

export default buildControls;