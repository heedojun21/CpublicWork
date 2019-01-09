import {
    USERNAME
} from '../actions/types';


export default function (state = {}, action) {

    switch (action.type) {
        case USERNAME:
            return action.payload;
    }

    return '';
}





