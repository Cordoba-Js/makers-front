import { maker } from "../data/maker";

export const makersReducers = (state = [], action) => {

    switch (action.type) {
        case 'addMaker':
            return [
                ...state,
                {
                    ...action.payload,
                }
            ];
        case 'removeMaker':
            return state.filter( maker => maker.id !== action.payload);

        case 'updateMaker':
            return state.map( m => {
                if(m.id === action.payload.id) {
                    return {
                        ...action.payload
                    };
                }
                return m;
            });
        case 'loadingMakers':
            return action.payload;

        default:
            return state;
    }
}