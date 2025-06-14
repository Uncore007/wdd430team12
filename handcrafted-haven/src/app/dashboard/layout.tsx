export const experimental_ppr = true;

import { signOut } from '@/auth';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200 p-4">
        <div className="navbar bg-base-100 rounded-box shadow-lg mb-4">
            <div className="flex-1">
            <h1 className="text-2xl font-bold px-4">Admin Dashboard</h1>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/avatar.png" alt="Avatar" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <a>Profile</a>
                        </li>
                        <li>
                            <form action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/' });
                            }}>
                                <button type="submit">Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      {children}
    </div>
  );
}