import React from 'react';
import InputWithLabel from "./Input";
import Button from './Button';

interface SignUpFormProps {
  formData: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    profileImg: File | null;
    profileImgPreview: string | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
          <div className="flex items-center">
            <img
              src={formData.profileImgPreview || "https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small_2x/man-avatar-icon-free-vector.jpg"}
              alt="Avatar Preview"
              className="w-16 h-16 rounded-full mr-4"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              name="profileImg"
              onChange={handleChange}
            />
          </div>
        </div>
        <InputWithLabel
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <InputWithLabel
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputWithLabel
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <InputWithLabel
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
