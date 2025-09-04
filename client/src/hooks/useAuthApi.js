import { useState, useCallback } from 'react';

const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud');
      }
      
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  }, []);

  const register = useCallback(async (userData) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }, [apiCall]);

  const login = useCallback(async (credentials) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }, [apiCall]);

  const getProfile = useCallback(async (token) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [apiCall]);

  return {
    loading,
    error,
    register,
    login,
    getProfile,
  };
};

export default useAuthApi;