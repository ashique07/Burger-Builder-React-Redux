import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../../shared/utility';

const initialState = {

    routePath : null
};

const navItemClicked = (state, action) => {

    return updateObject(state, {routePath : action.pathName});
};

const reducer = (state = initialState, action) => {

    switch(action.type) {

        case actionTypes.NAV_ITEM_CLICKED:
            return navItemClicked(state, action);
        default: 
            return state
    };
};

export default reducer;