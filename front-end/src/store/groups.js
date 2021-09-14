import { csrfFetch } from "./csrf";

export const GET_GROUPS = 'groups/GET_GROUPS'

const getGroups = (groups) => ({
    type: GET_GROUPS,
    groups
});

const initialState = {};

export const getAllGroups = () => async(dispatch) => {

    const response = await csrfFetch("/api/groups");
    if(response.ok){
        const groups = await response.json();
        dispatch(getGroups(groups));
        return groups;
    }
    return false;
}

const groupsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_GROUPS:
            newState = Object.assign({}, state);
            newState = [...action.groups]
            return newState;
        default:
            return state;
    }
}

export default groupsReducer;