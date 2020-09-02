import React, {Component} from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

export class NavigationItems extends Component {

    render()
    {
        let name = "Profile";
        if(this.props.address !== undefined && this.props.address !== null)
        {
            name = this.props.address.name;
        }

        return (
            <ul className={classes.NavigationItems}>

            <NavigationItem clicked={() => this.props.onNavItemClicked("/")} link = "/">Burger Builder</NavigationItem>
    
            {this.props.isAuthenticated ? <NavigationItem clicked={() => this.props.onNavItemClicked("/orders")} link = "/orders">Orders</NavigationItem> : null}
    
            {this.props.isAuthenticated ? <NavigationItem clicked={() => this.props.onNavItemClicked("/profile")} link = "/profile">
                {name}
                </NavigationItem> : null}
    
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

const mapStateToProps = state => {

    return {
        address : state.address.address
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);