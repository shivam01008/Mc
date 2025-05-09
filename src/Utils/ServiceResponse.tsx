export interface ServiceResponse<T> {
    status: boolean;
    message: string;
    response: T | null;
  }
  