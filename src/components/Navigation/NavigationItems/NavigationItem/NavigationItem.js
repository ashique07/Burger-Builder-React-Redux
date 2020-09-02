import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom'; 

const navigationItem = (props) => (

    <li onClick={props.clicked} className={classes.NavigationItem}>

        <NavLink to={props.link} exact activeClassName={classes.active}> {props.children} </NavLink>

    </li>

);

export default navigationItem;