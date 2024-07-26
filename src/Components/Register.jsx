import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../Utilities/toast";
import { applyErrorStyles, applyOkStyles } from "../Utilities/styleManager";

const Register = () => {

    const visibleEyeSvg = "svgs/visible.svg";
    const notVisibleEyeSvg = "svgs/notVisible.svg";

    const confirmPasswordRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();

    const [registrationData, setregistrationData] = useState({
        fullname: "",
        username: "",
        password: "",
        email: "",
    })
    const [passwordVisible, setPasswordVisible] = useState({ p1: false, p2: false })


    useEffect(() => {
        if (passwordVisible.p1) {
            passwordRef.current.nextSibling.src = "svgs/visible.svg";
            passwordRef.current.type = "text";
        }
        else {
            passwordRef.current.nextSibling.src = notVisibleEyeSvg;
            passwordRef.current.type = "password";
        }

        if (passwordVisible.p2) {
            confirmPasswordRef.current.nextSibling.src = visibleEyeSvg;
            confirmPasswordRef.current.type = "text";
        }
        else {
            confirmPasswordRef.current.nextSibling.src = notVisibleEyeSvg;
            confirmPasswordRef.current.type = "password";
        }

    }, [passwordVisible]);


    const resetStyle = () => {
        applyOkStyles(passwordRef.current);
        applyOkStyles(confirmPasswordRef.current);
        applyOkStyles(usernameRef.current);
        applyOkStyles(emailRef.current);
    }




    const handleChange = e => {
        resetStyle();
        setregistrationData(prevstate => ({ ...registrationData, [e.target.name]: e.target.value }));
    }

    const handleToggleVisible = (e) => {
        if (e.target.previousSibling.name === "password")
            setPasswordVisible(prev => ({ ...passwordVisible, p1: !passwordVisible.p1 }))
        else
            setPasswordVisible(prev => ({ ...passwordVisible, p2: !passwordVisible.p2 }))
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            toastError('Passwords didn\'t matched');

            resetStyle();
            applyErrorStyles(passwordRef.current);
            applyErrorStyles(confirmPasswordRef.current);


        } else {

            let res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registrationData)
            })
            let data = await res.json();

            if (data.usercreated ) {
                toastSuccess("Registration Successful");
                resetStyle();
                navigate("/login");

            } else if (!data.usercreated && data.errorcode === 11000) {
                console.log(data.duplicatedkey);
                toastError(data.duplicatedkey === "username" ? "username not available" : "email is already in use");
                if (data.duplicatedkey === "username") {
                    console.log("error");
                    resetStyle();
                    applyErrorStyles(usernameRef.current);
                } else {
                    resetStyle();
                    applyErrorStyles(emailRef.current);
                }
            } else {
                toastError(`Error in registering. error code ${data.errorcode}`);
            }

        }
    }


    return (<>
        <div className="fixed inset-0 -z-10 h-full w-full bg-sky-50 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="container mx-auto p-10 flex flex-col items-center">
                <h1 className="text-3xl font-bold">
                    <span className="text-sky-500">&#123;</span> Register<span className="text-sky-500"> &#125;</span>
                </h1>
                <h3 className="text-sky-500">Create Your Account</h3>
                <form className="flex flex-col gap-4 w-full md:w-11/12 lg:w-1/2 my-8 items-center">
                    <section className="w-full">
                        <label className="text-lg font-bold px-4  text-sky-600" htmlFor="fullname">Full Name:</label>
                        <input
                            onChange={handleChange}
                            value={registrationData.fullname}
                            required
                            name="fullname"
                            placeholder="Enter Full Name"
                            className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg"
                            type="text"
                        />
                    </section>
                    <section className="w-full">
                        <label className="text-lg font-bold px-4  text-sky-600" htmlFor="username">Username:</label>
                        <input
                            ref={usernameRef}
                            onChange={handleChange}
                            value={registrationData.username}
                            required
                            name="username"
                            placeholder="Enter Username"
                            className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg"
                            type="text"
                        />
                    </section>
                    <section className="w-full">
                        <label className="text-lg font-bold px-4  text-sky-600" htmlFor="email">Email:</label>
                        <input
                            ref={emailRef}
                            onChange={handleChange}
                            value={registrationData.email}
                            required
                            name="email"
                            placeholder="Enter Email"
                            className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg"
                            type="email"
                        />
                    </section>

                    <section className="w-full relative">
                        <label className="text-lg font-bold px-4  text-sky-600" htmlFor="password">Password:</label>
                        <input
                            onChange={handleChange}
                            value={registrationData.password}
                            ref={passwordRef}
                            required
                            name="password"
                            placeholder="Enter Password"
                            className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg"
                            type="password"
                        />
                        <img
                            onClick={handleToggleVisible}
                            className="absolute bottom-[5px] right-[8px] cursor-pointer"
                            src={notVisibleEyeSvg}
                            alt="Toggle Visibility"
                        />
                    </section>
                    <section className="w-full relative">
                        <label className="text-lg font-bold px-4  text-sky-600" htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            required
                            onChange={handleChange}
                            ref={confirmPasswordRef}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg"
                            type="password"
                        />
                        <img
                            onClick={handleToggleVisible}
                            className="absolute bottom-[5px] right-[8px] cursor-pointer"
                            src={notVisibleEyeSvg}
                            alt="Toggle Visibility"
                        />
                    </section>
                    <button
                        className="bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-400 p-2 w-fit flex items-center text-sm lg:text-lg"
                        type="submit" onClick={handleRegister}>
                        <img src="svgs/save.svg" alt="Register" className="mr-1 size-4 lg:size-5" />
                        Register
                    </button>
                </form>
            </div>
        </div>
    </>
    );
};

export default Register;
