import React, { useRef, useState } from "react";

const Manager = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const visibleRef = useRef();
    const passwordInputRef = useRef();
	const ToogleVisible = () => {
        setPasswordVisible(!passwordVisible);
        console.log(passwordVisible);
		visibleRef.current.src = passwordVisible ? "svgs/visible.svg" : "svgs/notVisible.svg";
		passwordInputRef.current.type = passwordVisible ? "text" : "password";
	};
	return (
		<>
			<div className="absolute inset-0 -z-10 h-full w-full bg-sky-50 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:14px_24px]">{/* <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-500 opacity-20 blur-[100px]"></div> */}</div>
			<div className=" container mx-auto p-10 flex flex-col items-center">
				<h1 className="text-3xl font-bold">
					<span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500">Guard &#125;</span>
				</h1>
				<h3 className="text-sky-500">Where Security Meets Simplicity</h3>
				<form className="flex flex-col gap-4 w-1/2 my-8 items-center" action="">
					<section className="w-full">
						<input placeholder="Enter The Website..." className="rounded-full p-1 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full" type="text" />
					</section>
					<section className="flex gap-12 w-full">
						<input placeholder="Enter Username" className="border p-1 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full" type="text" />
						<div className="w-full  relative">
							<input ref={passwordInputRef} placeholder="Enter Password" className="border p-1 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full" type="password" />
							<img ref={visibleRef} className="absolute top-[5px] right-[8px] cursor-pointer" onClick={ToogleVisible} src="svgs/notVisible.svg" alt="" />
						</div>
					</section>
					<button className="bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-400 p-3 w-fit flex" type="submit">
						<lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
						Add Credentials
					</button>
				</form>
			</div>
		</>
	);
};

export default Manager;
