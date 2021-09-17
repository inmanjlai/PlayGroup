import { csrfFetch } from "./csrf";

const initialState = { user: null, allUsers: [] };

export const GET_USERS = 'user/GET_USERS'
export const SET_USER = "user/SET_USER"
export const REMOVE_USER = "user/REMOVE_USER"

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})

const getAllUsers = (users) => ({
    type: GET_USERS,
    users
})

export const signup = (user) => async (dispatch) => {
    const { username, email, password, image } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
        username,
        email,
        password,
        image
    }),
});
const data = await response.json();
dispatch(setUser(data.user));
return response;
};

export const login = (user) => async(dispatch) => {
    const {credential, password} = user;
    
    const response = await csrfFetch("/api/session",
    {
        method: "POST", 
        body: JSON.stringify({credential, password})
    })
    
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
};

export const getUsers = () => async(dispatch) => {
    const response = await csrfFetch("/api/users");
    if(response.ok) {
        const users = await response.json();
        dispatch(getAllUsers(users));
    }
}

const loginUserReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_USERS:
            newState = { ...state }
            newState.allUsers = action.users
            return newState;
        case SET_USER:
            newState = Object.assign({}, state)
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;//that works btw
        default:
            return state
    }
}
            
export default loginUserReducer;