'use client';

import { useActionState } from 'react';
import { authenticate } from '../lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
    );

    return (
         <form action={formAction}>
            <div className="form-control mb-4">
                <label className="label">
                <span className="label-text">Email</span>
                </label>
                <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
                />
            </div>
            <div className="form-control mb-6">
                <label className="label">
                <span className="label-text">Password</span>
                </label>
                <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
                />
            </div>
            <div className="card-actions justify-end">
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <button className="btn btn-primary w-full" type="submit">
                Login
                </button>
            </div>

            {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
            )}
        </form>
    );
}