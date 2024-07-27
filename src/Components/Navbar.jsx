import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handleLogOut, currentUser={} }) => {
	let profileTimeOut;
	// console.log(currentUser);

	const profileRef = useRef();
	const handleProfileView = (e) => {
		profileRef.current.classList.toggle("scale-0");
	}

	const handleMouseLeave = () => {
		profileTimeOut = setTimeout(() => {
			profileRef.current.classList.toggle("scale-0");
		}, 500);
	}

	const handleMouseMove = () => {
		clearTimeout(profileTimeOut);
	}

	return (
		<nav className="flex sticky top-0 z-10 items-center bg-[#09182e] text-white h-14 justify-between px-6 md:px-32">
			<Link to={"/"} className="text-xl md:text-2xl font-bold">
				<span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500">Guard &#125;</span>
			</Link>
			<div className="flex gap-7 md:gap-14">
				<a className="hover:text-sky-300 transition-all duration-400 ease-linear" href="https://github.com/Prabin1025y/Password-Manager" target="_blank">
					<div className="flex px-3 py-1 rounded-full text-sm md:text-lg ring-1 ring-sky-100 bg-sky-800 gap-3"><img className="scale-150" src="../svgs/github.svg" alt="GitHub" />Contribute</div>
				</a>
				<div className="md:relative">
					<img onClick={handleProfileView} src="../svgs/avatar.svg" className="scale-125" alt="avatar" />
					<div ref={profileRef} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} className="absolute transition-all duration-1000 origin-top-right scale-0 md:origin-top right-0 md:-left-[350%] top-12 md:top-10 text-black bg-white border-2 py-6 px-2 rounded-xl flex items-center gap-1 w-[200px] flex-col border-black z-10">
						<img src="../svgs/avatar.svg" className="size-10 z-20" alt="avatar" />
						<div className="size-8 bg-white absolute right-4 md:right-auto rotate-45 -top-2 rounded-md"></div>
						<h3 className="font-bold">{currentUser.fullname}</h3>
						<p>Since {currentUser.date}</p>
						<button onClick={handleLogOut} className="text-black flex justify-center rounded-lg gap-3 w-full py-3 transition duration-300 hover:bg-sky-100"><img src="../svgs/logout.svg" alt="logout" />Log Out</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
