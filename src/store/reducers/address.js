import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initiatState = {

    address : null,
    loading : false,
    purchased : false 
};

const reducer = (state = initiatState, action) => {

    switch(action.type) {

        case actionTypes.ADDRESS_INIT:

            return updateObject(state,{purchased : false});

        case actionTypes.ADDRESS_SUCCESS:

            //const newAddress = updateObject(action.addressData, {id : action.addressId});

            return updateObject(state, {
                address : action.addressData,
                loading : false,
                purchased : true
            });

        case actionTypes.ADDRESS_FAIL:

            return updateObject(state,{loading : false});
        
        case actionTypes.ADDRESS_START:
            
            return updateObject(state,{loading: true});

        case actionTypes.FETCH_ADDRESS_SUCCESS:

            return updateObject(state, {
                address : action.address,
                loading : false
            });
        
        case actionTypes.FETCH_ADDRESS_FAIL:

            return updateObject(state, {
                loading : false,
                address: {}});

        case actionTypes.FETCH_ADDRESS_START:

            return updateObject(state, {loading : true});

        default:
            return state;    
    }

};

export default reducer;