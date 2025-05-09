// types.ts
export type UserLoginParamsType = {
    username: string;
    password: string;
  };
  
  export type userLoginResponseType = {
    // Define your response data here. For example:
    userId: string;
    token: string;
    username: string;
  };
  
  export type ServiceResponse<T> = {
    status: boolean;
    message: string;
    response: T;
  };
  