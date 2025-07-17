'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css'

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>

        <label className={css.formGroup}>
          Username
          <input type="text" name="userName" required className={css.input} />
        </label>

        <label className={css.formGroup}>
          Email
          <input type="email" name="email" required className={css.input} />
        </label>

        <label className={css.formGroup}>
          Password
          <input type="password" name="password" required className={css.input} />
        </label>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Register</button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
