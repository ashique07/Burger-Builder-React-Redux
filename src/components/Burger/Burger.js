import React from 'react';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(

        ingKey => {

            return [...Array(props.ingredients[ingKey])].map(

                (_,index) => {

                    return <BurgerIngredient type = {ingKey} key = {ingKey + index}/>

                }
            );

        }
    ).reduce( (arr,elem) => {

        return arr.concat(elem);
    }, []);

    if(transformedIngredients.length === 0)
    {
        transformedIngredients = <p>PLEASE ADD INGREDIENTS</p>;
    }

    return (

        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top"/>
             {transformedIngredients}
            <BurgerIngredient type = "bread-bottom"/>
        </div>

    );
};

export default burger;