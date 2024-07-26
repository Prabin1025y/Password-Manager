import React from "react";

const Navbar = () => {
	return (
		<nav className="flex sticky top-0 z-10 items-center bg-[#09182e] text-white h-14 justify-between px-6 md:px-32">
			<h1 className="text-xl md:text-2xl font-bold">
				<span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500">Guard &#125;</span>
			</h1>
			<div className="flex gap-14">
				<a className="hover:text-sky-300 transition-all duration-400 ease-linear" href="https://github.com/Prabin1025y/Password-Manager" target="_blank">
					<div className="flex px-3 py-1 rounded-full ring-1 ring-sky-100 bg-sky-800 gap-3"><img className="scale-150" src="../svgs/github.svg" alt="GitHub" />Contribute</div>
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
