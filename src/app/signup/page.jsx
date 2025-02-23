'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignupMutation } from '@/features/auth/authApi';

const SignupPage = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData).unwrap();
      console.log("response", response)
      router.push('/login');
    } catch (error) {
      setError("Email already exists");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="w-full py-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="relative bg-[#CBE4E8] w-full md:w-1/2 h-48 md:h-auto">
          <div className="relative w-full h-full">
            <img
              src="./login.png"
              alt="Shopping illustration"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 max-w-md mx-auto space-y-8 p-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
            <p className="text-gray-600 mt-2">Enter your details below</p>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email or Phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;