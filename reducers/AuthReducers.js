const initState = {
  user: {}
}

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };
    
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user
      };  

    case "LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      }

    default:
      return state;
  }
} 