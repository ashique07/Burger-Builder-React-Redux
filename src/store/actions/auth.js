import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {

    return {
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {

    return {
        type : actionTypes.AUTH_SUCCESS,
        idToken : token,
        userId : userId
    };
};

export const authFail = (error) => {

    return {
        type : actionTypes.AUTH_FAIL,
        error : error 
    };
};

export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("address");

    return {
        type : actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {

    return dispatch => {

        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000);
    };
};


export const auth = (email, password, isSignup) => {

    const authData = {
        email : email,
        password : password,
        returnSecureToken : true
    };

    return dispatch => {

        dispatch(authStart());

        //SIGN-UP
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQ52lcgCD6w6dE2R8njkKpRmtfhjVidmM";

        if(!isSignup)
        {
            //SIGN-IN
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQ52lcgCD6w6dE2R8njkKpRmtfhjVidmM";
        }
      
        axios.post(url, authData)
        .then(response => {

            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {

            console.log(error);
            dispatch(authFail(error.response.data.error.message));
        });

    };

};

export const setAuthRedirectPath = (path) => {

    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    };
};

export const authCheckLocalStorage = () => {

    return dispatch => {

        const token = localStorage.getItem("token");
        if(!token)
        {
            dispatch(logout());
        }
        else
        {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));

            if(expirationDate < new Date())
            {
                dispatch(logout());
                //TOKEN HAS EXPIRED
            }
            else
            {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    };
};