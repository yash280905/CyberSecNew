import React from 'react';
import Link from 'next/link';
const Navbar = () => {
    return (
        <nav className="flex items-center justify-between bg-black p-4 shadow">
            <div className="text-3xl text-orange-300 font-bold">Sanjay</div>
            <ul className="flex space-x-6 text-xl">
                <li>
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
                    >
                        Home
                    </Link>
                </li>   
                <li>
                    <Link
                        href="/dashboard"
                        className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        href="/customize"
                        className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
                    >
                        Customize
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        href="/help"
                        className="text-gray-300 hover:text-blue-600 transition-colors duration-300"
                    >
                        Help
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;