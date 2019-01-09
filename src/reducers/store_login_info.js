import {
    LOGIN_INFO
} from '../actions/types';


export default function (state = {}, action) {

    switch (action.type) {
        case LOGIN_INFO:
            return action.payload;
        default:
            return state;
    }

}





