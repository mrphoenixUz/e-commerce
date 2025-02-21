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
      // console.error('Failed to log in:', error);
      setError("Invalid email or password");
    }
  }
  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="w-full py-12 flex flex-col md:flex-row gap-8 items-center">
        {/* Left side - Image */}
        <div className="relative bg-[#CBE4E8] w-full md:w-1/2 h-48 md:h-auto">
          <div className="relative w-full h-full">
            <img
              src="./login.png"
              alt="Shopping cart with phone and shopping bags"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Right side - Form */}
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
              <a href="/forgot-password" className="text-red-500 hover:text-red-600">
                Forget Password?
              </a>
            </div>

            {/* <button
              type="button"
              className="w-full py-3 px-4 bg-white border border-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700">Log in with Google</span>
            </button> */}
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