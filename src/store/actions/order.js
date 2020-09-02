import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => {

    return {
        type : actionTypes.PURCHASE_INIT
    };
};

export const purchaseBurgerSuccess = (orderData, id) => {

    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData
    };
};

export const purchaseBurgerFail = (error) => {

    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error : error 
    };
};

export const purchaseBurgerStart = () => {

    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {

    return dispatch => {

        dispatch(purchaseBurgerStart());

        axios.post("/orders.json?auth=" + token, orderData)
        .then(response => {

            dispatch(purchaseBurgerSuccess(orderData, response.data.name));
            //this.props.history.push("/");
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
    }
};

export const fetchOrders = (token, userId) => {

    return dispatch => {

        dispatch(fetchOrdersStart());

        const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId +'"';

        axios.get("/orders.json" + queryParams).then(

            response => {
                
                let fetchedData = [];

                for(let key in response.data)
                {
                    fetchedData.push({

                        ...response.data[key],
                        id: key
                    });
                }

               dispatch(fetchOrdersSuccess(fetchedData));
            }
        )
        .catch(
            error =>
            {
                console.log(error);
                dispatch(fetchOrdersFail(error));
            }
        )
    };
};

export const fetchOrdersStart = () => {

    return {
        type : actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = (orders) => {

    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    };
};

export const fetchOrdersFail = (error) => {

    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error : error 
    };
};

export const deleteOrder = (orderId, token) => {

    return dispatch => {

        dispatch(deleteOrderStart());

        axios.delete("/orders/" + orderId + ".json?auth=" + token)

        .then(
            response => {
               
               dispatch(deleteOrderSuccess(orderId, response.data));
            }
        )
        .catch(
            error =>
            {
                console.log(error);
                dispatch(deleteOrderFail(error));
            }
        );

    }
};

export const deleteOrderStart = () => {

    return {
        type : actionTypes.DELETE_ORDER_START
    };
};

export const deleteOrderSuccess = (orderId, responseData) => {

    return {
        type : actionTypes.DELETE_ORDER_SUCCESS,
        orderId : orderId,
        responseData : responseData
    };
};

export const deleteOrderFail = (error) => {

    return {
        type : actionTypes.DELETE_ORDER_FAIL,
        error : error 
    };
};