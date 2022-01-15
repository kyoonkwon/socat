import {createAction} from 'redux-actions'

const initialState = {
    rand : 0
}

export const loadRod = createAction(LOADROD, rand => rand);
