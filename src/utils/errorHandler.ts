// src/utils/errorHandler.ts
import { isAxiosError, type AxiosError } from 'axios';

export interface HttpError {
  status?: number;
  message: string;
  code?: string;
}

export const normalizeAxiosError = (error: AxiosError | any): HttpError => {
  if (isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data as any;
      return {
        status: error.response.status,
        message: data?.message || data?.error || 'Server error',
        code: data?.code,
      };
    }

    if (error.request) {
      return {
        message: 'No response from server (network error)',
      };
    }
  }

  return {
    message: error?.message || 'Unknown error',
  };
};
