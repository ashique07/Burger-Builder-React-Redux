import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {checkValidity} from '../../shared/utility';

class ContactData extends Component {

    state = {
        
        orderForm: {

            name: {
                
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: "Name cannot be empty"
            },

            street: {

                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: "Street cannot be empty"

            },

            zipCode: {

                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Zip Code'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false,
                errorMessage: "Zip Code cannot be empty and must be more than 5 characters and less than 10 characters"
            },

            country: {

                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your country'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: "Country cannot be empty"
            },

            email: {

                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                errorMessage: "Email cannot be empty"

            },

            deliveryMethod: {

                elementType: 'select',
                elementConfig: {
                   
                    options : [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },

                value: "fastest",
                valid: true
            }
        },

        formIsValid: false,

        addressAvailabe: false,

        fetchAddressLoading: false,

        addressId : null,

        address : null,

        purchased : false
    }

    componentDidMount()
    {
            //this.props.onAddressInit();

            //this.props.onFetchAddress(this.props.token, this.props.userId);

            this.setState({fetchAddressLoading : true, purchased : false});

            const queryParams = "?auth=" + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId +'"';
    
            axios.get("/address.json" + queryParams).then(
    
                response => {
    
                    let fetchedData = {};     
                   
                         for(let key in response.data)
                        {
                                if(response.data[key].addressData === undefined || response.data[key].addressData == null)
                                {
                                    fetchedData = {
                                        addressData : {
                                            name : "",
                                            street : "",
                                            zipCode : "",
                                            country : "",
                                            email : "",
                                            deliveryMethod : "fastest"
                                        },
                                        id: ""
                                    }
                                }
                                else{
                                    fetchedData = {
    
                                        ...response.data[key],
                                        id: key
                                    };
                                }    
                        } 
                          
    
                            let updatedOrderForm = null;
                            let isAddressAvailable = false;

                            updatedOrderForm = {

                            ...this.state.orderForm,
                            name : {
                                ...this.state.orderForm.name,
                                value : fetchedData.addressData.name,
                                valid : true
                            },
                            street : {
                                ...this.state.orderForm.street,
                                value : fetchedData.addressData.street,
                                valid : true
                            },
                            zipCode : {
                                ...this.state.orderForm.zipCode,
                                value: fetchedData.addressData.zipCode,
                                valid : true
                            },
                            country : {
                                ...this.state.orderForm.country,
                                value : fetchedData.addressData.country,
                                valid : true
                            },
                            email : {
                                ...this.state.orderForm.email,
                                value : fetchedData.addressData.email,
                                valid : true
                            },
                            deliveryMethod : {
                                ...this.state.orderForm.deliveryMethod,
                                value: fetchedData.addressData.deliveryMethod,
                                valid : true
                            }
                            };

                            isAddressAvailable = true;

                localStorage.setItem("address", JSON.stringify(fetchedData.addressData));

                this.setState({orderForm : updatedOrderForm, 
                    addressAvailabe : isAddressAvailable, 
                    fetchAddressLoading : false,
                    addressId : fetchedData.id,
                    formIsValid: true});
                  
                }
            )
            .catch(
                error =>
                {
                    console.log(error);
                    this.setState({fetchAddressLoading : false})
                }
            )
        
    }

    componentDidUpdate()
    {

    }

    onAddressSubmit = (address, token, addressId, addressAvailable) => {

        this.setState({fetchAddressLoading : true});

        if(addressAvailable)
        {
            const queryParams = "?auth=" + token/* + '&equalTo="' + userId +'"'*/;
                
            axios.put("/address/" + addressId + ".json" + queryParams, address)
            .then(response => {

                //dispatch(addressSuccess(address.addressData, response.data.name));
                this.setState({address :address.addressData, fetchAddressLoading : false, purchased : true});
                
            })
            .catch(error => {
                //dispatch(addressFail(error));
                this.setState({fetchAddressLoading : false});
            });
            
        }
        else    
        {
            axios.post("/address.json?auth=" + token, address)
            .then(response => {

                //dispatch(addressSuccess(address.addressData, response.data.name));
                this.setState({address :address.addressData, fetchAddressLoading : false, purchased : true});
                //this.props.history.push("/");
            })
            .catch(error => {
                //dispatch(addressFail(error));
                this.setState({fetchAddressLoading : false});
            });

        }

    }

    orderHandler = (event) => {

        event.preventDefault();

        //this.setState({loading : true});
        const formData = {};

        for (let formElementIdentifier in this.state.orderForm)
        {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {

            ingredients : this.props.ingredients,
            price : this.props.price.toFixed(2),
            orderData : formData,
            userId : this.props.userId
        };

        const address = {

            addressData : formData,
            userId : this.props.userId
        };

        if(this.props.appPath === "/profile")
        {
            this.onAddressSubmit(address, this.props.token, this.state.addressId, this.state.addressAvailabe)

            //dispatch(addressStart());
        }
        else
        {
            this.props.onOrderBurger(order, this.props.token);
        }
    };

    inputChangedHandler = (event, inputIdentifier) => {


        const updatedOrderForm = {

            ...this.state.orderForm
        };

        const updatedFormElement = {

            ...updatedOrderForm[inputIdentifier]

        };

        updatedFormElement.value = event.target.value;

        if(updatedFormElement.validation)
        {
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        }

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm)
        {
            if(!updatedOrderForm[inputIdentifier].valid)
            {
                formIsValid = false;
                break;
            }
        }

        this.setState({orderForm : updatedOrderForm, formIsValid : formIsValid});
    }

    render()
    {
        let buttonLabel = "";
        let formHeading = "";
        if(this.props.appPath === "/profile")
        {
            if(this.state.addressAvailabe)
            {
                formHeading = "Your Profile"
                buttonLabel = "Update Profile"
            }
            else
            {
                formHeading = "Your profile is not set. Please enter your information"
                buttonLabel = "Set Profile"
            }
        }
        else
        {
            formHeading = "Please enter your information"
            buttonLabel = "Send Data"
        }

        const formElemArray = [];

        for(let key in this.state.orderForm)
        {
            formElemArray.push ({

                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
        
        <form onSubmit = {this.orderHandler}>

            {formElemArray.map( formElement => {

                return(
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
                );

    })}

<Button disabled={!this.state.formIsValid} btnType="Success">
    {buttonLabel}
</Button>

        </form>);

        if(this.props.orderloading || this.state.fetchAddressLoading)
        {
            form = <Spinner/>;
        }

        let addressRedirect = null;
        if(this.props.appPath === "/profile" && /*this.props.addressComplete*/ this.state.purchased){
        
        this.props.onFetchAddress(this.props.token, this.props.userId);

        this.props.onSetRoutePath("/");
        addressRedirect = <Redirect to = "/"/>;
        }

        return(

            <div className={classes.ContactData}>
                {addressRedirect}
                <h4>{formHeading}</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        ingredients : state.burgerBuilder.ingredients,
        price : state.burgerBuilder.totalPrice,
        orderloading : state.order.loading,
        //addressloading : state.address.loading,
        //address : state.address.address,
        //addressComplete : state.address.purchased,
        token : state.auth.token,
        userId : state.auth.userId,
        appPath : state.app.routePath
    };
};

const mapDispatchToProps = dispatch => {

    return {

        onOrderBurger : (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
        //onAddress : (addressData, token, userId, addressAvailabe) => dispatch(actions.address(addressData, token, userId, addressAvailabe)),
        //onAddressInit : () => dispatch(actions.addressInit()),
        onSetRoutePath : (pathName) => dispatch(actions.navItemClicked(pathName)),
        onFetchAddress : (token, userId) => dispatch(actions.fetchAddress(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));