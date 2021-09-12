import { csrfFetch } from "./csrf";

export const GET_DB = 'event/GET_DB'
//// FOR LATER ->
// export const GET_USERS = 'event/GET_USERS'
// export const GET_EVENTS = 'event/GET_EVENTS'
// export const GET_LOCATIONS = 'event/GET_LOCATIONS'
// export const GET_GAMES = 'event/GET_GAMES'


const getDatabase = (database) => ({
    type: GET_DB,
    database
})


////// FOR LATER ->

// const getUsers = (users) => ({
//     type: GET_USERS,
//     users
// })

// const getEvents = (events) => ({
//     type: GET_EVENTS,
//     events
// })

// const getLocations = (locations) => ({
//     type: GET_LOCATIONS,
//     locations
// })

// const getGames = (games) => ({
//     type: GET_GAMES,
//     games
// })

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


//// TRY THIS LATER
// export const getResource = (resource) => async(dispatch) => {

//     const response = await csrfFetch('/api/db');
//     if(response.ok){
//         const data = await response.json();
//         const specificData = data[resource];
//         dispatch(`get${resource}(${resource.toLowerCase()})`)
//         return specificData;
//     }

// }

const dbReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_DB:
            newState = Object.assign({}, state);
            for(let resource in action.database) {
                newState[resource] = action.database[resource]
            }
            return newState
        default:
            return state;
    }
}

export default dbReducer;