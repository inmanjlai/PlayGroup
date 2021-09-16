import { csrfFetch } from "./csrf";

export const GET_GROUPS = 'groups/GET_GROUPS'
export const CREATE_GROUP = 'groups/CREATE_GROUP'
export const EDIT_GROUP = 'groups/EDIT_GROUP'
export const DELETE_GROUP = 'groups/DELETE_GROUP'
export const JOIN_GROUP = 'groups/JOIN_GROUP'

const getGroups = (groups) => ({
    type: GET_GROUPS,
    groups
});

const createGroup = (group) => ({
    type: CREATE_GROUP,
    group
})

const editGroup = (group) => ({
    type: EDIT_GROUP,
    group
})

// const deleteGroup = (group) => ({
//     type: EDIT_GROUP,
//     group
// });

// const joinGroup = (group) => ({
//     type: JOIN_GROUP,
//     group
// })

// const leaveGroup = (groups) => ({
//     type: GET_GROUPS,
//     groups
// })

const initialState = {groups: null};

export const getAllGroups = () => async(dispatch) => {

    const response = await csrfFetch("/api/groups");
    if(response.ok){
        const groups = await response.json();
        console.log(groups, "<----- GROUPS")
        dispatch(getGroups(groups));
        return groups;
    }
    return false;
}

export const createOneGroup = ({name, description, ownerId, image}) => async(dispatch) => {

    const response = await csrfFetch("/api/groups",
    {
        method: "POST",
        body: JSON.stringify({name: name, description: description, ownerId: ownerId, image: image })
    })

    if(response.ok) {
        const group = await response.json();
        dispatch(createGroup(group));
        return group;
    }
    return false;
}

export const editOneGroup = ({name, description, groupId, image}) => async(dispatch) => {

    const response = await csrfFetch("/api/groups",
    {
        method: "PUT",
        body: JSON.stringify({name: name, description: description, groupId: groupId, image: image })
    })

    if(response.ok) {
        const group = await response.json();
        dispatch(editGroup(group));
        return group;
    }
    return false;
}

export const deleteOneGroup = (groupId) => async(dispatch) => {

    const response = await csrfFetch("/api/groups",
    {
        method: "DELETE",
        body: JSON.stringify({groupId})
    })

    if(response.ok) {
        const group = await response.json();
        dispatch(getGroups(group))
        return group;
    }
} 

export const joinOneGroup = ({groupId, userId}) => async(dispatch) => {

    const response = await csrfFetch("/api/userGroups", 
    {
        method: "POST",
        body: JSON.stringify({groupId, userId})
    })

    const groups = await response.json()
    dispatch(getGroups(groups));
}

export const leaveOneGroup = ({groupId, userId}) => async(dispatch) => {

    const response = await csrfFetch("/api/userGroups", 
    {
        method: "DELETE",
        body: JSON.stringify({groupId, userId})
    })

    const groups = await response.json()
    dispatch(getGroups(groups));
}

const groupsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_GROUPS:
            newState = Object.assign({}, state);
            newState.groups = action.groups
            return newState;
        case CREATE_GROUP:
            newState = Object.assign({}, state);
            newState.groups[action.group.id] = action.group;
            return newState;
        case EDIT_GROUP:
            newState = Object.assign({}, state);
            newState.groups[action.group.id] = action.group;
            return newState;
        case DELETE_GROUP:
            // being handled by just dispatching(getGroups(group)) in the delete thunk
            return newState;
        case JOIN_GROUP:
            newState = Object.assign({}, state);
            newState.groups = action.groups
            return newState;
        default:
            return state;
    }
}

export default groupsReducer;