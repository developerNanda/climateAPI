import { GET_CLIMTAE_DATA } from "../actions/type";


const initialState = {};

function climateReducer(state=initialState, action){
    const { type, payload } = action;

    switch(type){
        case GET_CLIMTAE_DATA:
            return payload
        default:
            return state
    }
}

export default climateReducer;