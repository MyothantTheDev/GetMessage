import firebaseApp from '../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from 'firebase/auth';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({type: "LOGIN_REQUEST"});
    const userCredential = await signInWithEmailAndPassword(getAuth(firebaseApp), email, password);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: userCredential
    })
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.message, 
    })
  }
}

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: "CLEAR_ERRORS"
	})
}