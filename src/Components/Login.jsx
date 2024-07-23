import React, { useState, useRef, useEffect } from "react";

const Login = () => {
    // const [passwordVisible, setPasswordVisible] = useState(false);
    // const [loginData, setLoginData] = useState({ username: "", password: "" });

    // const visibleRef = useRef();
    // const passwordInputRef = useRef();

    // useEffect(() => {
    //     visibleRef.current.src = passwordVisible ? "svgs/visible.svg" : "svgs/notVisible.svg";
    //     passwordInputRef.current.type = passwordVisible ? "text" : "password";
    // }, [passwordVisible]);

    // const handleToggleVisible = () => {
    //     setPasswordVisible(!passwordVisible);
    // };

    // const handleChange = e => {
    //     setLoginData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    // };

    return (
        <div className="fixed inset-0 -z-10 h-full w-full bg-sky-50 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="container mx-auto p-10 flex flex-col items-center">
                <h1 className="text-3xl font-bold">
                    <span className="text-sky-500">&#123;</span> Login<span className="text-sky-500"> &#125;</span>
                </h1>
                <h3 className="text-sky-500">Secure Your Access</h3>
                <form className="flex flex-col gap-4 w-full md:w-11/12 lg:w-1/2 my-8 items-center">
                    <section className="w-full">
                        <input 
                            required 
                            name="username" 
                            placeholder="Enter Username" 
                            className="rounded-full p-1 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg" 
                            type="text" 
                        />
                    </section>
                    <section className="w-full relative">
                        <input 
                            required 
                            name="password" 
                            placeholder="Enter Password" 
                            className="rounded-full p-1 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg" 
                            type="password" 
                        />
                        <img 
                            className="absolute top-[5px] right-[8px] cursor-pointer" 
                            src="svgs/notVisible.svg" 
                            alt="Toggle Visibility" 
                        />
                    </section>
                    <button 
                        className="bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-400 p-2 w-fit flex items-center text-sm lg:text-lg" 
                        type="submit">
                        <img src="svgs/save.svg" alt="Login" className="mr-1 size-4 lg:size-5" />
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
