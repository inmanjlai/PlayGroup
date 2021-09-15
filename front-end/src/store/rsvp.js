import { csrfFetch } from "./csrf";

export const GET_RSVPS = 'rsvp/GET_RSVPS'
export const CREATE_RSVP = 'rsvp/CREATE_RSVP'
export const EDIT_RSVP = 'rsvp/EDIT_RSVP'
export const DELETE_RSVP = 'rsvp/DELETE_RSVP'

const getRSVPs = (rsvp) => ({
    type: GET_RSVPS,
    rsvp
});

const editRSVP = (formData) => ({
    type: EDIT_RSVP,
    formData
})

const deleteRSVP = (rsvp) => ({
    type: DELETE_RSVP,
    rsvp
})

const createRSVP = (rsvp) => ({
    type: CREATE_RSVP,
    rsvp
})

const initialState = {rsvps: null};

export const getAllRSVPs = () => async(dispatch) => {

    const response = await csrfFetch("/api/rsvps");
    if(response.ok){
        const rsvp = await response.json();
        dispatch(getRSVPs(rsvp));
        return rsvp;
    }
    return false;
}

export const editOneRSVP = ({userId, eventId}) => async(dispatch) => {
    const response = await csrfFetch('/api/rsvps', 
        {
            method: "PUT",
            body: JSON.stringify(userId, eventId)
        }
    )
    if(response.ok){
        const rsvp = await response.json();
        dispatch(editRSVP(rsvp))
        return rsvp;
    }
    return false;
}

export const deleteOneRSVP = ({userId, eventId}) => async(dispatch) => {
    const response = await csrfFetch('/api/rsvps', 
        {
            method: "DELETE",
            body: JSON.stringify({userId: userId, eventId:eventId})
        }
    )
    if(response.ok){
        const rsvp = await response.json();
        dispatch(getRSVPs(rsvp))
        return rsvp;
    }
    return false;
}

export const createOneRSVP = ({userId, eventId}) => async(dispatch) => {
    const response = await csrfFetch('/api/rsvps', 
    {
        method: "POST",
        body: JSON.stringify({userId: userId, eventId: eventId})
    })
    if (response.ok) {
        const rsvp = await response.json();
        dispatch(createRSVP(rsvp));
        return rsvp;
    }
    return false;
}

const rsvpReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_RSVPS:
            newState = Object.assign({}, state);
            newState.rsvps = action.rsvp
            return newState;
        case CREATE_RSVP:
            debugger;
            newState = Object.assign({}, state);
            newState.rsvps[action.rsvp.id] = action.rsvp;
            return newState;
        case DELETE_RSVP:
            // being handled by calling getrsvps in the delete thunk
            return newState;
        default:
            return state;
    }
}

export default rsvpReducer;
