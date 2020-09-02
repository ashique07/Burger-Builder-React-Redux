import React, {Component} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

export class NavigationItems extends Component {

    render()
    {
        return (
            <ul className={classes.NavigationItems}>

            <NavigationItem clicked={() => this.props.onNavItemClicked("/")} link = "/">Burger Builder</NavigationItem>
    
            {this.props.isAuthenticated ? <NavigationItem clicked={() => this.props.onNavItemClicked("/orders")} link = "/orders">Orders</NavigationItem> : null}
    
            {this.props.isAuthenticated ? <NavigationItem clicked={() => this.props.onNavItemClicked("/profile")} link = "/profile">Profile</NavigationItem> : null}
    
            {this.props.isAuthenticated 
            ? <NavigationItem clicked={() => this.props.onNavItemClicked("/logout")} link = "/logout">Logout</NavigationItem> 
            : <NavigationItem clicked={() =>this.props.onNavItemClicked("/auth")} link = "/auth">Authenticate</NavigationItem>}
            
            </ul>

        );
    }
}

const mapDispatchToProps = dispatch => {

    return {
        onNavItemClicked : (pathName) => dispatch(actions.navItemClicked(pathName))
    };
};

export default connect(null,mapDispatchToProps)(NavigationItems);