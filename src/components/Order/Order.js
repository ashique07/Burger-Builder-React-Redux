import React from 'react';
import classes from './Order.module.css';
import Button from '../UI/Button/Button';

const order = (props) => {

    let ingredients = [];

    for(let ingredientName in props.ingredients)
    {
        ingredients.push(
            {
                name : ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(

        ingredient => {

            return(
            <span key={ingredient.name} style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #eee'
            }}>{ingredient.name} ({ingredient.amount}) </span>
            )
        }
    );

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: USD {props.price}</p>
            <Button clicked = {props.addressButton} disabled = {false} btnType="Success">SHOW ADDRESS</Button>
            <Button clicked = {props.deleteButton} disabled = {false} btnType="Danger">DELETE ORDER FROM LIST</Button>
        </div>
    );

}

export default order;