import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../Utilities/toast";
import { applyErrorStyles, applyOkStyles } from "../Utilities/styleManager";
// import { toast } from "react-toastify";

const Login = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginData, setLoginData] = useState({ username: "", password: "" });

    const passwordRef = useRef();
    const usernameRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        passwordRef.current.nextSibling.src = passwordVisible ? "svgs/visible.svg" : "svgs/notVisible.svg";
        passwordRef.current.type = passwordVisible ? "text" : "password";
    }, [passwordVisible]);

    const resetStyle = () => {
        applyOkStyles(passwordRef.current);
        applyOkStyles(usernameRef.current);
    }

    const handleToggleVisible = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = e => {
        resetStyle();
        setLoginData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        let res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData),
            credentials: "include"
        })

        let data = await res.json();

        if (data.userfound) {
            toastSuccess(`Logged in as ${data.fullname}.`);
            navigate(`/home/${data.userid}`);
        } else if (!data.userfound && !data.error) {
            if (data.incorrectfield === "username") {
                toastError(`Invalid username or email.`);
                resetStyle();
                applyErrorStyles(usernameRef.current);
            }
            else {
                toastError("Invalid Password");
                resetStyle();
                applyErrorStyles(passwordRef.current);
            }
        } else {
            toastError("Error while logging in!");
            resetStyle();
        }
        console.log(data);

    }

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
                            onChange={handleChange}
                            value={loginData.username}
                            ref={usernameRef}
                            required
                            name="username"
                            placeholder="Enter Username or Email"
                            className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg"
                            type="text"
                        />
                    </section>
                    <section className="w-full relative">
                        <input
                            required
                            onChange={handleChange}
                            value={loginData.password}
                            ref={passwordRef}
                            name="password"
                            placeholder="Enter Password"
                            className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg"
                            type="password"
                        />
                        <img
                            onClick={handleToggleVisible}
                            className="absolute top-[8px] right-[8px] cursor-pointer"
                            src="svgs/notVisible.svg"
                            alt="Toggle Visibility"
                        />
                    </section>
                    <button
                        onClick={handleLogin}
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
