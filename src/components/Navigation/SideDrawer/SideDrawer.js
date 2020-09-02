import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open)
    {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (

        <Aux>

        <Backdrop clicked={props.closed} show={props.open}/>        

        <div className = {attachedClasses.join(" ")} onClick={props.closed}>

        <div>MENU</div>

        <div className = {classes.Logo}>
        <Logo/>
        </div>

        <nav>
        <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>

        </div>
        </Aux>

    );
}

export default sideDrawer;