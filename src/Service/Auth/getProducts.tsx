import axios from 'axios';
import { Endpoint } from '../../config/config';
import { ProductType, ServiceResponse } from '../Auth/typess';

// Utility function for consistent error handling
const handleError = (error: any): ServiceResponse<ProductType[]> => {
  console.error('Error in getProducts:', error);
  return {
    status: false,
    message: 'Error occurred while fetching products',
    response: [],
  };
};

export const getProducts = async (): Promise<ServiceResponse<ProductType[]>> => {
  console.log('Fetching products...');
  
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    
    if (response && response.data) {
      console.log('Products API Response:', JSON.stringify(response.data));
      return {
        status: true,
        message: 'Products fetched successfully',
        response: response.data,
      };
    } else {
      throw new Error('Empty response data');
    }
  } catch (error) {
    return handleError(error);  // Handle the error consistently
  }
};
