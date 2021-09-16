import { csrfFetch } from "./csrf";

export const GET_LOCATIONS = 'locations/GET_LOCATIONS'

const getLocations = (locations) => ({
    type: GET_LOCATIONS,
    locations
});

const initialState = {locations: null};

export const getAllLocations = () => async(dispatch) => {

    const response = await csrfFetch("/api/locations");
    if(response.ok){
        const locations = await response.json();
        dispatch(getLocations(locations));
        return locations;
    }
    return false;
}

const locationsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_LOCATIONS:
            newState = Object.assign({}, state);
            newState.locations = action.locations
            return newState;
        default:
            return state;
    }
}

export default locationsReducer;
