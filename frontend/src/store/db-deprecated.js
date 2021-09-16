import { csrfFetch } from "./csrf";

export const GET_DB = 'database/GET_DB'
export const CREATE_RSVP = 'event/CREATE_RSVP'

const getDatabase = (database) => ({
    type: GET_DB,
    database
})

const createRSVP = (rsvp) => ({
    type: CREATE_RSVP,
    rsvp
})

const initialState = {};

export const getEntireDatabase = () => async(dispatch) => {

    const response = await csrfFetch('/api/db')
    if(response.ok){
        const database = await response.json()
        dispatch(getDatabase(database))
        return database;
    }
    return false;
}


export const createOneRSVP = ({userId, eventId}) => async(dispatch) => {
    const response = await csrfFetch('/api/rsvp', 
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

const dbReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_DB:
            newState = Object.assign({}, state);
            for(let resource in action.database) {
                newState[resource] = action.database[resource]
            }
            return newState
        case CREATE_RSVP:
            newState = Object.assign({}, state);
            debugger;
            const newArr = [...newState.events.RSVPs, action.rsvp];
            newState.events.RSVPs = newArr;
            return newState;
        default:
            return state;
    }
}

export default dbReducer;