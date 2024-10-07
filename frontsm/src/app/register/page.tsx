"use client";

import { RegisterForm } from '@/components/organisms/RegisterForm';
import React from 'react';


const RegisterPage: React.FC = () => {
  return (
    <div className="formLayout">
        <div className="formLayout__container">
            <h2 className="formLayout__title">Registro</h2>
            <RegisterForm />
        </div>
    </div>
  );
};

export default RegisterPage;
