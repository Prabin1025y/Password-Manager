import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarSecondary from './NavbarSecondary';

const WelcomePage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function fetching() {
            const res = await fetch("http://localhost:3000/", { credentials: "include" })
            let data = await res.json();
            if (data.loggenIn)
                navigate("/home/" + data.userid)
        }
        fetching();
    }, []);

    return (
        <>
            <NavbarSecondary />
            <div className="fixed inset-0 -z-10 h-full w-full bg-sky-50 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:14px_24px]">{/* <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-500 opacity-20 blur-[100px]"></div> */}</div>
            <div className="flex flex-col items-center justify-center h-screen text-center ">
                <h1 className=" text-5xl my-10 font-bold">
                    <span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500 ">Guard &#125;</span>
                </h1>
                <h1 className="text-xl font-bold text-sky-900">Welcome to Your Password Manager</h1>
                <p className="text-xl text-sky-800 mt-4">Securely manage your passwords and keep your accounts safe.</p>
                <div className="mt-8 space-x-4 flex">
                    <Link to="/login" className="bg-sky-500 flex gap-1 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-sky-600 transition duration-300"><img src="svgs/login.svg" alt="login" /> Login</Link>
                    <Link to="/register" className="bg-green-500 flex gap-1 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-green-600 transition duration-300"><img src="svgs/signin.svg" alt="register" />Register</Link>
                </div>
            </div></>
    );
};

export default WelcomePage;
