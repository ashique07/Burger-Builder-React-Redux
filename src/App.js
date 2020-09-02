import React, { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from "./containers/Checkout/Checkout";
//import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
//import ContactData from "./containers/ContactData/ContactData";
import {Route, withRouter, Switch} from "react-router-dom";
import Logout from './containers/Auth/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

const asyncContactData = asyncComponent(() => {
  return import("./containers/ContactData/ContactData");
});

class App extends Component {

  componentDidMount()
  {
    this.props.onTryAutoSignUp();
    this.props.onTryFindPathName();
  }

  render(){

    /*
    let routes = (
      <Switch>
      <Route path="/auth" component={Auth}/>
      <Route path="/checkout" component={Checkout}/>
      <Route path="/" exact component={BurgerBuilder}/>
      </Switch>
    );

    if(this.props.isAuthenticated)
    {
      */
    let routes = (
      <Switch>
      <Route path="/auth" component={asyncAuth}/>
      <Route path="/checkout" component={asyncCheckout}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/orders" component={asyncOrders}/>
      <Route path="/profile" component={asyncContactData}/>
      <Route path="/" exact component={BurgerBuilder}/>
      </Switch>
      );
    //}

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );

  }
  
}

const mapStateToProps = state => {

  return {
    isAuthenticated : state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {

  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckLocalStorage()),
    onTryFindPathName : () => dispatch(actions.appCheckLocalStorage())
  };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));