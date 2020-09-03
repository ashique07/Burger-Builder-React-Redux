import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addressInit = () => {

    return {
        type : actionTypes.ADDRESS_INIT
    };
};

export const addressSuccess = (addressData, id) => {

    return {
        type : actionTypes.ADDRESS_SUCCESS,
        addressId : id,
        addressData : addressData
    };
};

export const addressFail = (error) => {

    return {
        type : actionTypes.ADDRESS_FAIL,
        error : error 
    };
};

export const addressStart = () => {

    return {
        type: actionTypes.ADDRESS_START
    };
};

export const address = (address, token, addressId, addressAvailable) => {

    return dispatch => {

        dispatch(addressStart());

        if(addressAvailable)
        {
            const queryParams = "?auth=" + token/* + '&equalTo="' + userId +'"'*/;
                
            axios.put("/address/" + addressId + ".json" + queryParams, address)
            .then(response => {

                dispatch(addressSuccess(address.addressData, response.data.name));
                //this.props.history.push("/");
            })
            .catch(error => {
                dispatch(addressFail(error));
            });
            
        }
        else    
        {
            axios.post("/address.json?auth=" + token, address)
            .then(response => {

                dispatch(addressSuccess(address.addressData, response.data.name));
                //this.props.history.push("/");
            })
            .catch(error => {
                dispatch(addressFail(error));
            });

        }
    }
};

export const fetchAddress = (token, userId) => {

    return dispatch => {

        dispatch(fetchAddressStart());

        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId +'"';

        axios.get("/address.json" + queryParams).then(

            response => {

                let fetchedData = {};
                /*
                if(response.data == undefined || response.data == null)
                {
                    fetchedData = {
                        addressData : {
                            name : "",
                            street : "",
                            zipCode : "",
                            country : "",
                            email : "",
                            deliveryMethod : "fastest"
                        }
                    }
                }
                else{
                */    
                    for(let key in response.data)
                    {
                        fetchedData = {

                            ...response.data[key],
                            id: key
                        };
                    }

               localStorage.setItem("address", JSON.stringify(fetchedData.addressData));     
               dispatch(fetchAddressSuccess(fetchedData.addressData));
            }
        )
        .catch(
            error =>
            {
                console.log(error);
                dispatch(fetchAddressFail(error));
            }
        )
    };
};

export const fetchAddressStart = () => {

    return {
        type : actionTypes.FETCH_ADDRESS_START
    };
};

export const fetchAddressSuccess = (address) => {

    return {
        type : actionTypes.FETCH_ADDRESS_SUCCESS,
        address : address
    };
};

export const fetchAddressFail = (error) => {

    return {
        type : actionTypes.FETCH_ADDRESS_FAIL,
        error : error 
    };
};

export const addressCheckLocalStorage = () => {

    return dispatch => {

    let address = localStorage.getItem("address");

    if(address)
    {
        try{
        dispatch(fetchAddressSuccess(JSON.parse(address)));
        }
        catch(error)
        {
            //console.log(error);
        }
    }
 
    };
};