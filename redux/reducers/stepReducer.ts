import { RecipeSteps, StepActionTypes, ADD_STEP, STEP_COMPLETE} from "../actions/stepAction";

export interface StepState {
    steps: Array<RecipeSteps>
}

const initialState: StepState = {
    steps: []
}


export const stepReducer = (state = initialState, action: StepActionTypes) => {
    switch(action.type) {
        case ADD_STEP:
            return {
                ...state,
                steps: [
                    ...state.steps,
                ]
            }
        case STEP_COMPLETE:
            return {
                ...state,
                stepAdded: true,
                completed: true
            };
        default:
            return state;
    };
}