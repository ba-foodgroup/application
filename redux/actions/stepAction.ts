import { PostActionComplete } from "./postAction";

export const ADD_STEP = 'ADD_STEP';
export const STEP_COMPLETE = 'STEP_COMPLETE';
export const DELETE_STEP = 'DELETE_STEP'

export interface RecipeSteps {
    stepNo?: number,
    stepText: string,
    // cost: number,
    // retailer: string,
    // stepAdded?: boolean,
    // completed?: boolean
}

export const postRecipeStepComplete = (payload: boolean) => {
    return{
        type: STEP_COMPLETE,
        payload: payload
    };

};
let nextNo =  0;
export const postAddStep = (stepText: string) => {
    return {
        type: ADD_STEP,
        payload: stepText,
        stepNo: nextNo++
    };
};

export const deleteStep = (payload: RecipeSteps) => {
    return {
        type: DELETE_STEP,
        payload: payload
    }
}

export interface PostStepActionComplete {
    type: typeof STEP_COMPLETE,
    payload: boolean
}

export interface PostAddStep {
    type: typeof ADD_STEP,
    payload: RecipeSteps
}

export type StepActionTypes = | PostStepActionComplete | PostAddStep;