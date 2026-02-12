import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("USER_ADMIN"));

    const handleLogout = () => {
        localStorage.removeItem("USER_ADMIN");
        navigate("/");
    };

    return (
        <header className="fixed w-full z-20 top-0 left-0 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-rose-500">
                        airbnb
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-900 dark:text-white font-medium">Hello, {user.user.name}</span>
                            {user.user.role === "ADMIN" && (
                                <Link to="/admin" className="text-blue-600 hover:underline">Admin Dashboard</Link>
                            )}
                            <button
                                onClick={handleLogout}
                                type="button"
                                className="text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link
                                to="/auth/login"
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className="text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 pl-3 pr-4 text-white bg-rose-500 rounded md:bg-transparent md:text-rose-500 md:p-0 md:dark:text-rose-500"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Experiences
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-rose-500 md:p-0 md:dark:hover:text-rose-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Online Experiences
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
