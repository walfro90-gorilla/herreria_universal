import { useState, useCallback } from 'react';

const useAdminApi = () => {
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

  // Productos
  const getProducts = useCallback(async (token) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [apiCall]);

  const createProduct = useCallback(async (token, productData) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/admin/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  }, [apiCall]);

  const updateProduct = useCallback(async (token, productId, productData) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/admin/products/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  }, [apiCall]);

  const deleteProduct = useCallback(async (token, productId) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [apiCall]);

  // Usuarios
  const getUsers = useCallback(async (token) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [apiCall]);

  const deleteUser = useCallback(async (token, userId) => {
    return apiCall(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [apiCall]);

  return {
    loading,
    error,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getUsers,
    deleteUser,
  };
};

export default useAdminApi;