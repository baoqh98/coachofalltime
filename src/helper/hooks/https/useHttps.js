import { useReducer, useCallback } from 'react';

const httpRequestFunction = async (url, request) => {
  let response;

  if (request.method === 'GET') {
    response = await fetch(url);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return await response.json();
  }

  if (
    request.method === 'POST' ||
    request.method === 'DELETE' ||
    request.method === 'PUT'
  ) {
    response = await fetch(url, {
      method: request.method,
      body: JSON.stringify(request.body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return await response.json();
  }

  return response;
};

const httpReducer = (state, action) => {
  if (action.status === 'PENDING') {
    return {
      isLoading: true,
      error: null,
      data: null,
    };
  }

  if (
    action.request === 'GET' ||
    action.request === 'POST' ||
    action.request === 'DELETE' ||
    action.request === 'PUT'
  ) {
    return {
      isLoading: false,
      error: null,
      data: action.responseData,
    };
  }

  if (action.request === 'ERROR') {
    return {
      isLoading: false,
      error: action.errorMessage,
      data: null,
    };
  }

  return state;
};

const defaultState = {
  isLoading: false,
  error: null,
  data: null,
};

export const useHttps = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, defaultState);

  const sendRequest = useCallback(async (url, request) => {
    dispatchHttp({ status: 'PENDING' });
    try {
      if (!request) {
        throw new Error('Something wrong!');
      }
      const responseData = await httpRequestFunction(url, request);
      dispatchHttp({ request: request.method, responseData });
      return responseData;
    } catch (error) {
      dispatchHttp({ type: 'ERROR', errorMessage: error || error.message });
    }
  }, []);

  return [{ ...httpState }, sendRequest];
};
