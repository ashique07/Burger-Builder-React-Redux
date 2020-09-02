import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {

    state = {

        controls : {

            email: {
                
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail : true
                },
                valid: false,
                touched: false,
                errorMessage: "Email cannot be empty and must be a proper email"
            },
          
            password: {
                
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength : 6
                },
                valid: false,
                touched: false,
                errorMessage: "Password cannot be empty and must be more than 6 characters"
            },  

        },

        isSignup : true
    };

    componentDidMount () {

        
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/")
        {
            this.props.onSetRedirectPath();
        }
        
    }

    inputChangedHandler = (event, controlName) => {

        const updatedControl = {
            ...this.state.controls,

            [controlName] : {

                ...this.state.controls[controlName],

                value : event.target.value,

                valid : checkValidity(event.target.value, this.state.controls[controlName].validation),

                touched : true,
            }
        };

        this.setState({controls : updatedControl});

    };

    switchAuthModeHandler = () => {

        this.setState(prevState => {
            return {isSignup : !prevState.isSignup};
        });
    };

    submitHandler = (event) => {

        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    };

    render () {

        const formElementArray = [];

        for(let key in this.state.controls)
        {
            formElementArray.push({
                id:key,
                config : this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement => (

            <Input 
            key = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig = {formElement.config.elementConfig}
            value = {formElement.config.value}
            changed = {(event) => this.inputChangedHandler(event, formElement.id)}
            inValid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            errorMessage = {formElement.config.errorMessage} />

        ));

        if(this.props.loading)
        {
            form = <Spinner/>;
        }

        let errorMessage = null;
        if(this.props.error)
        {
            errorMessage = (
            <p>{this.props.error}</p>
            );
        }

        let authRedirect = null;
        
        if(this.props.isAuthenticated)
        {
            this.props.onFetchAddress(this.props.token, this.props.userId);
            
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit = {(event) => this.submitHandler(event)}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button btnType='Danger' 
                clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup ? "SIGN-IN" : "SIGN-UP" }</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticated : state.auth.token !== null,
        authRedirectPath : state.auth.authRedirectPath,
        buildingBurger : state.burgerBuilder.building,
        token : state.auth.token,
        userId : state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {

    return {

        onAuth : (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetRedirectPath : () => dispatch(actions.setAuthRedirectPath("/")),
        onFetchAddress : (token, userId) => dispatch(actions.fetchAddress(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);