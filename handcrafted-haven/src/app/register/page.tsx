'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Registration attempt with:', { firstName, lastName, email, password });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Handcrafted Haven</h1>
            <p className="text-sm text-base-content/70 mt-2">Create your account to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="input w-full transition-all duration-200 focus:input-primary border-2 border-gray-300 bg-white"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="input w-full transition-all duration-200 focus:input-primary border-2 border-gray-300 bg-white"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input w-full transition-all duration-200 focus:input-primary border-2 border-gray-300 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="Create a password"
                className="input w-full transition-all duration-200 focus:input-primary border-2 border-gray-300 bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input w-full transition-all duration-200 focus:input-primary border-2 border-gray-300 bg-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn btn-primary w-full hover:brightness-105 transition-all duration-200"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="divider my-6">OR</div>
          
          <div className="text-center">
            <p className="text-base-content/70">
              Already have an account?{' '}
              <Link href="/login" className="link link-primary font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 