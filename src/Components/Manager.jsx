import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [userData, setuserData] = useState({ sitename: "", username: "", password: "" });
	const [users, setusers] = useState([]);



	const visibleRef = useRef();
	const passwordInputRef = useRef();




	useEffect(() => {
		visibleRef.current.src = passwordVisible ? "svgs/visible.svg" : "svgs/notVisible.svg";
		passwordInputRef.current.type = passwordVisible ? "text" : "password";
	}, [passwordVisible]);

	useEffect(() => {
		let data = JSON.parse(localStorage.getItem("userData"));
		// console.log(data);
		if (data)
			setusers(data)
	}, [])

	useEffect(() => {
		setuserData({ sitename: "", username: "", password: "" });
	}, [users])






	const handleToogleVisible = () => {
		setPasswordVisible(!passwordVisible);
		// console.log(passwordVisible);
	};

	const handleChange = e => {
		setuserData(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }));
	};

	const handleDelete = (id) => {
		setusers(users.filter(item => item.id !== id));
		localStorage.setItem("userData", JSON.stringify(users.filter(item => item.id !== id)));
	}

	const handleEdit = () => {

	}

	const handleAddData = e => {
		e.preventDefault();
		if (userData.sitename && userData.username && userData.password) {
			setusers([...users, userData]);
			localStorage.setItem("userData", JSON.stringify([...users, { ...userData, id: uuidv4() }]));

			toast.success("Credentials Added Successfully", {
				position: "bottom-right",
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "colored",
			});
		} else {
			toast.error("Please Fill all Credentials", {
				position: "bottom-right",
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "colored",
			});
		}
	};

	const copyText = (text) => {
		navigator.clipboard.writeText(text);
		toast.info('Copied to ClipBoard', {
			position: "bottom-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			progress: undefined,
			theme: "colored",
		});
	}

	// console.log(users);
	return (
		<>
			<ToastContainer />
			<div className="absolute inset-0 -z-10 h-full w-full bg-sky-50 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:14px_24px]">{/* <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-500 opacity-20 blur-[100px]"></div> */}</div>
			<div className=" container mx-auto p-10 flex flex-col items-center">
				<h1 className="text-3xl font-bold">
					<span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500">Guard &#125;</span>
				</h1>
				<h3 className="text-sky-500">Where Security Meets Simplicity</h3>
				<form className="flex flex-col gap-4 w-1/2 my-8 items-center" action="">
					<section className="w-full">
						<input required value={userData.sitename} onChange={handleChange} name="sitename" placeholder="Enter The Website..." className="rounded-full p-1 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full" type="text" />
					</section>
					<section className="flex gap-12 w-full">
						<input required value={userData.username} onChange={handleChange} name="username" placeholder="Enter Username" className="border p-1 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full" type="text" />
						<div className="w-full  relative">
							<input required value={userData.password} onChange={handleChange} name="password" ref={passwordInputRef} placeholder="Enter Password" className="border p-1 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full" type="password" />
							<img ref={visibleRef} className="absolute top-[5px] right-[8px] cursor-pointer" onClick={handleToogleVisible} src="svgs/notVisible.svg" alt="" />
						</div>
					</section>
					<button onClick={handleAddData} className="bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-400 p-3 w-fit flex" type="submit">
						{/* <img src="Gifs/add-file.gif" alt="" /> */}
						<lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
						Add Credentials
					</button>
				</form>
				{users.length === 0 && <div>No Passwords Saved.</div>}
				{users.length !== 0 &&
					<table className="min-w-full bg-sky-100">
						<thead>
							<tr className="bg-sky-800 text-white">
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Site</th>
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Username</th>
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Password</th>
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((item, index) => {
								return <tr key={index}>
									<td className="px-6 py-4 border-b border-sky-700">{item.sitename}</td>
									<td className="px-6 py-4 border-b border-sky-700"><div onClick={() => copyText(item.username)} className="flex gap-2">{item.username}<img className="w-5 cursor-pointer" src="svgs/copy.svg" alt="copy Text" /></div></td>
									<td className="px-6 py-4 border-b border-sky-700"><div onClick={() => copyText(item.password)} className="flex gap-2">{item.password}<img className="w-5 cursor-pointer" src="svgs/copy.svg" alt="copy Text" /></div></td>
									<td className="px-6 py-4 border-b border-sky-700"><div className="flex gap-3"><img className="cursor-pointer" onClick={handleEdit} src="svgs/edit.svg" alt="Edit" /><img className="cursor-pointer" onClick={() => handleDelete(item.id)} src="svgs/delete.svg" alt="Delete" /></div></td>
								</tr>
							})}

						</tbody>
					</table>}
			</div>
		</>
	);
};

export default Manager;
