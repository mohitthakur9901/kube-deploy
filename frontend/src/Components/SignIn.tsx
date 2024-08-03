import React from "react";
import Button from "./Button";
import InputWithLabel from "./Input";

interface SignUpFormProps {
    formData: {
      email: string;
      password: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const SignInForm: React.FC<SignUpFormProps> = ({ formData, handleChange, handleSubmit }) => {
 

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
        <InputWithLabel
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputWithLabel
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit"  >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;