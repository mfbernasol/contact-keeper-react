import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticaed: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, intialState);

  // Load User
  const loadUser = () => console.log('loaduser');

  // Regsiter User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //  Login User
  const login = () => console.log('loaduser');

  // Logout
  const logout = () => console.log('loaduser');

  // Clear errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Clear Filter

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticaed: state.isAuthenticaed,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
