/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IInputErrorState {
  success: boolean;
  errors: {
    field: string;
    message: string
  }[]
}

export const getInputFieldError = (fieldName:string, state:IInputErrorState) => {
  
  if(state && state.errors){
    const error = state.errors.find((err: any) => err.field === fieldName)
    return error ? error.message : null
  } else {
    return null
  }

}
