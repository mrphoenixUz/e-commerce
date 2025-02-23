"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/features/auth/authApi';

const LoginPage = () => {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      localStorage.setItem('token', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/');
    } catch (error) {
      setError("Invalid email or password");
    }
  }
  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="w-full py-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="relative bg-[#CBE4E8] w-full md:w-1/2 h-48 md:h-auto">
          <div className="relative w-full h-full">
            <img
              src="./login.png"
              alt="Shopping cart with phone and shopping bags"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 max-w-md mx-auto space-y-8 p-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Log in to PhoenixShop</h1>
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
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <input
                  type="password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="w-32 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors"
              >
                {isLoading ? 'Loading...' : 'Log in'}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;