import React from  'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (

    <header className = {classes.Toolbar}>

        <div className = {classes.Logo}>
        <Logo/>
        </div>

        <h2 className={classes.DesktopOnly}>Ashique's Burger Builder</h2>

        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>

        <DrawerToggle clicked = {props.drawerToggleClicked}/>
        
    </header>

);

export default toolbar;