"use client";

import { LoginForm } from '@/components/organisms/LoginForm';
import React from 'react';


const LoginPage: React.FC = () => {
  return (
    <div className="formLayout">
      <div className="formLayout__container">
        <h2 className="formLayout__title">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
