"use client";
import { useState } from "react";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/clientApi";
import { UserRequest } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const handlesubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as UserRequest;
      const res = await login(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handlesubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
};

export default SignIn;