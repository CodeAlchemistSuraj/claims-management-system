import { useState } from 'react';
import { useAuth } from './useAuth.js';
import { authService } from '../services/authService.js';

export const useProtectedEndpoint = () => {
  const { token } = useAuth();
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testEndpoint = async () => {
    setLoading(true);
    setError('');
    setResponse('');

    try {
      const data = await authService.testProtectedEndpoint(token);
      setResponse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { testEndpoint, response, loading, error };
};