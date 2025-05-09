import axios from "axios";

// export const catchHandling = (error: any) => {
//     if (axios.isAxiosError(error)) {
//       return {
//         status: error.response?.data?.success || false,
//         message: error.response?.data?.message || 'An error occurred',
//         response: error.response,
//       };
//     } else {
//       return { status: false, message: error.toString() };
//     }
//   };
  
  // utils/catchHandling.ts
export const catchHandling = (error: any) => {
    let message = 'Something went wrong';
    if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message) {
      message = error.message;
    }
    return {
      status: false,
      message,
      response: null,
    };
  };
  