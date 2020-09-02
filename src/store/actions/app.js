import * as actionTypes from './actionTypes';

export const navItemClicked = (pathName) => {

    localStorage.setItem("pathName", pathName);
    return {
        type : actionTypes.NAV_ITEM_CLICKED,
        pathName : pathName
    };
};

export const appCheckLocalStorage = () => {

    return dispatch => {

    const pathName = localStorage.getItem("pathName");

    if(pathName)
    {
        dispatch(navItemClicked(pathName));
    }

    };
};