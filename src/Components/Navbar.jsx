import React from "react";

const Navbar = () => {
	return (
		<nav className="flex items-center bg-[#09182e] text-white h-14 justify-between px-32">
			<h1 className="text-2xl font-bold">
				<span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500">Guard &#125;</span>
			</h1>
			<div className="flex gap-14">
				<a className="hover:text-sky-300 transition-all duration-400 ease-linear" href="#">
					Home
				</a>
				<a className="hover:text-sky-300 transition-all duration-400 ease-linear" href="#">
					About
				</a>
				<a className="hover:text-sky-300 transition-all duration-400 ease-linear" href="#">
					Contact
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
