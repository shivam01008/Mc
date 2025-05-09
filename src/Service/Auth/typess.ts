// src/types/product.ts

export type ProductType = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
  
  export type ServiceResponse<T> = {
    status: boolean;
    message: string;
    response?: T;
  };
  