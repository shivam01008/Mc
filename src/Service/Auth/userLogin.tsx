// api/userLogin.ts
import { Endpoint } from '../../Config/config';
import { catchHandling } from '../../Utils/catchHandling';
import { UserLoginParamsType, ServiceResponse, userLoginResponseType } from '../Auth/types';

// User Login Function
export const userLogin = async (body: UserLoginParamsType): Promise<ServiceResponse<userLoginResponseType>> => {
  console.log("Inside userLogin", JSON.stringify(body));

  try {
    // Make sure the body includes the correct parameters (username and password)
    const response = await Endpoint.post('/auth/login', body);

    // Add detailed logging to check the full response
    console.log("Full API Response:", JSON.stringify(response));
    console.log("Response Data:", JSON.stringify(response?.data)); // Check if data exists
    console.log("Token in Response:", JSON.stringify(response?.data?.token)); // Extract token directly

    // If the token is not found, throw an error
    if (!response?.data?.token) {
      throw new Error('Token not found in the response');
    }

    return {
      status: true, // Assuming status is always true when you get a token
      message: 'Login successful', // Adjust the message if needed
      response: response.data.token, // Use the token from the response
    };
  } catch (error) {
    console.log("Error in userLogin:", error);
    return catchHandling(error); // Handle the error appropriately
  }
};
