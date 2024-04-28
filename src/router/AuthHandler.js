import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate('/login');
    };

    window.addEventListener('unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [navigate]);

  return null;
};

export default AuthHandler;