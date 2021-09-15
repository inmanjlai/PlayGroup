import { csrfFetch } from "./csrf";

export const GET_GROUPS = 'groups/GET_GROUPS'
export const CREATE_GROUP = 'groups/CREATE_GROUP'
export const EDIT_GROUP = 'groups/EDIT_GROUP'
export const DELETE_GROUP = 'groups/DELETE_GROUP'

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

const deleteGroup = (group) => ({
    type: EDIT_GROUP,
    group
});

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

export const createOneGroup = ({name, description, ownerId}) => async(dispatch) => {

    const response = await csrfFetch("/api/groups",
    {
        method: "POST",
        body: JSON.stringify({name: name, description: description, ownerId: ownerId })
    })

    if(response.ok) {
        const group = await response.json();
        dispatch(createGroup(group));
        return group;
    }
    return false;
}

export const editOneGroup = ({name, description, groupId}) => async(dispatch) => {

    const response = await csrfFetch("/api/groups",
    {
        method: "PUT",
        body: JSON.stringify({name: name, description: description, groupId: groupId })
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
        default:
            return state;
    }
}

export default groupsReducer;