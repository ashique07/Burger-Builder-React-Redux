import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initiatState = {

    orders : [],
    loading : false,
    purchased : false 
};

const deleteResult = (state, action) => {

    const updatedArray = state.orders.filter(order => order.id !== action.orderId);
            
    return {
        ...state,
        loading : false,
        orders: updatedArray
    };  
};

const reducer = (state = initiatState, action) => {

    switch(action.type) {

        case actionTypes.PURCHASE_INIT:

            return updateObject(state,{purchased : false});

        case actionTypes.PURCHASE_BURGER_SUCCESS:

            const newOrder = updateObject(action.orderData, {id : action.orderId});

            return updateObject(state, {
                orders : state.orders.concat(newOrder),
                loading : false,
                purchased : false
            });

        case actionTypes.PURCHASE_BURGER_FAIL:

            return updateObject(state,{loading : false, purchased : false});
        
        case actionTypes.PURCHASE_BURGER_START:
            
            return updateObject(state,{loading: true, purchased : true});

        case actionTypes.FETCH_ORDERS_SUCCESS:

            return updateObject(state, {
                orders : action.orders,
                loading : false
            });
        
        case actionTypes.FETCH_ORDERS_FAIL:

            return updateObject(state, {
                loading : false,
                orders: []});

        case actionTypes.FETCH_ORDERS_START:

            return updateObject(state, {loading : true});
      
        case actionTypes.DELETE_ORDER_SUCCESS:

            return deleteResult(state, action);
        
        case actionTypes.DELETE_ORDER_FAIL:

            return updateObject(state, {loading : false});

        case actionTypes.DELETE_ORDER_START:

            return updateObject(state, {loading : true});

        default:
            return state;    
    }

};

export default reducer;