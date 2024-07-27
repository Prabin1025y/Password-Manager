import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { redirect, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { toastError, toastInfo, toastSuccess } from "../Utilities/toast";
import { useNavigate } from "react-router-dom";
import Authentication from "../Utilities/Authentication";

const Manager = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [userData, setuserData] = useState({ sitename: "", username: "", password: "" });
	const [users, setusers] = useState([]);


	const { currentUserId } = useParams();
	const currentUser = useRef();
	const visibleRef = useRef();
	const passwordInputRef = useRef();
	const navigate = useNavigate();

	const getPasswords = async () => {
		let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/home/${currentUserId}`, { credentials: "include" });
		// let res = await fetch(`http://localhost:3000/home/${currentUserId}`, { credentials: "include" });
		let data = await res.json();

		let isAuthenticated = Authentication(data);
		if (!isAuthenticated)
			navigate("/login")

		if (!data.user) {
			navigate("/");
			// return;
		}

		currentUser.current = data.user;
		if (data.passwords)
			setusers(data.passwords)
	};

	useEffect(() => {
		visibleRef.current.src = passwordVisible ? "../svgs/visible.svg" : "../svgs/notVisible.svg";
		passwordInputRef.current.type = passwordVisible ? "text" : "password";
	}, [passwordVisible]);


	useEffect(() => {
		//While Using Local Storage
		// let data = JSON.parse(localStorage.getItem("userData"));

		//Using MongoDB
		getPasswords();

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

	const handleDelete = async (passwordId) => {
		// console.log(id);
		let c = confirm("Do you really want to delete this data?")
		if (c) {
			//Using local storage
			// setusers(users.filter(item => item.id !== id));
			// localStorage.setItem("userData", JSON.stringify(users.filter(item => item.id !== id)));

			//Using MongoDB
			// await fetch("http://localhost:3000/delete/" + id, {
			await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete/${passwordId}`, {
				credentials: "include"
			});
			getPasswords();

			toastSuccess("Data Deleted!");
		}
	}

	const handleEdit = (passwordId) => {
		setuserData(users.filter(password => password._id === passwordId)[0]);
	}

	const handleAddData = async e => {
		e.preventDefault();
		if (userData.sitename && userData.username && userData.password) {
			if (userData._id) {
				let index = users.findIndex(item => item._id === userData._id);
				// let updatedArray = users;
				// console.log(index);

				if (index !== -1) {
					// updatedArray = [...users.slice(0, index),
					// 	userData,
					// ...users.slice(index + 1)];
					// setusers([...users.slice(0, index), userData, ...users.slice(index + 1)]);

					//Using Local Storage
					// localStorage.setItem("userData", JSON.stringify([...users.slice(0, index), userData, ...users.slice(index + 1)]));

					//Using MongoDB
					// await fetch("http://localhost:3000/edit/" + userData._id, {
					await fetch(`${import.meta.env.VITE_BACKEND_URL}/edit/${userData._id}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(userData),
						credentials: "include"
					})

					getPasswords();

					toastSuccess("Credentials Updated");
				}
			} else {
				// setusers([...users, userData]);
				// console.log(userData);

				// while using local storage
				// localStorage.setItem("userData", JSON.stringify([...users, { ...userData, id: uuidv4() }]));

				//while using mongodb
				// console.log(currentUserId);
				// await fetch("http://localhost:3000/home/" + currentUserId, {
				await fetch(`${import.meta.env.VITE_BACKEND_URL}/home/${currentUserId}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(userData),
					credentials: "include"
				})
				getPasswords();
				toastSuccess("Credentials Saved.");
			}
		} else {
			toastError("Please Fill all Credentials");
		}
	};

	const handleLogOut = async () => {
		// await fetch("http://localhost:3000/logout", {
		await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
			credentials: "include"
		});
		toastSuccess("Logged Out.");
		navigate("/login");
	}

	const handleEachPassword = (e) => {
		// e.target.src = e.target.src == `http://localhost:5173/svgs/notVisible.svg` ? "../svgs/visible.svg" : "../svgs/notVisible.svg";
		e.target.src = e.target.src == `${import.meta.env.VITE_FRONTEND_URL}/svgs/notVisible.svg` ? "../svgs/visible.svg" : "../svgs/notVisible.svg";
		e.target.parentElement.parentElement.previousSibling.firstElementChild.classList.toggle("text-password");
	};

	const copyText = (text) => {
		navigator.clipboard.writeText(text);
		toastInfo("Copied to Clipboard");
	}

	// console.log(users);
	return (
		<>
			<Navbar handleLogOut={handleLogOut} currentUser={currentUser.current} />
			{/* <ToastContainer pauseOnFocusLoss={false} /> */}
			<div className="fixed inset-0 -z-10 h-full w-full bg-sky-50 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:14px_24px]">{/* <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-500 opacity-20 blur-[100px]"></div> */}</div>
			<div className="container mx-auto p-10 flex flex-col items-center">
				<h1 className=" text-3xl font-bold">
					<span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500">Guard &#125;</span>
				</h1>
				<h3 className="text-sky-500">Where Security Meets Simplicity</h3>
				<form className="flex flex-col gap-4 w-full md:w-11/12 lg:w-1/2 my-8 items-center" action="">
					<section className="w-full">
						<input required value={userData.sitename} onChange={handleChange} name="sitename" placeholder="Enter The Website..." className="rounded-full p-1 px-3 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg" type="text" />
					</section>
					<section className="flex gap-3 flex-col sm:flex-row md:gap-12 w-full">
						<input required value={userData.username} onChange={handleChange} name="username" placeholder="Enter Username" className="border p-1 px-3 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full text-sm lg:text-lg" type="text" />
						<div className="w-full  relative">
							<input required value={userData.password} onChange={handleChange} name="password" ref={passwordInputRef} placeholder="Enter Password" className="border p-1 px-3 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full text-sm lg:text-lg" type="password" />
							<img ref={visibleRef} className="absolute top-[8px] right-[8px] cursor-pointer" onClick={handleToogleVisible} src="../svgs/notVisible.svg" alt="visible" />
						</div>
					</section>
					<button onClick={handleAddData} className="bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-400 p-2 w-fit flex items-center text-sm lg:text-lg" type="submit">
						<img src="../svgs/save.svg" alt="save" className="mr-1 size-4 lg:size-5" />
						Save
					</button>
				</form>
				{users.length === 0 && <div>No Passwords Saved.</div>}
				{users.length !== 0 && <div className="w-full">

					<table className="min-w-full bg-sky-100 hidden md:table">
						<thead className="sticky top-[56px]">
							<tr className="bg-sky-800 text-white">
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Site</th>
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Username</th>
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Password</th>
								<th className="px-6 py-3 text-left text-sm leading-4 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody className="overflow-y-scroll">
							{users.map((item, index) => {
								return <tr key={index}>
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700">{item.sitename}</td>
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700"><div className="flex gap-2">{item.username}<img onClick={() => copyText(item.username)} className="w-5 cursor-pointer" src="../svgs/copy.svg" alt="copy Text" /></div></td>
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700"><div className="flex gap-2 text-password">{item.password}<img onClick={() => copyText(item.password)} className="w-5 cursor-pointer" src="../svgs/copy.svg" alt="copy Text" /></div></td>
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700"><div className="flex gap-3"><img className="cursor-pointer" onClick={handleEachPassword} src="../svgs/notVisible.svg" alt="" /><img className="cursor-pointer" onClick={() => handleEdit(item._id)} src="../svgs/edit.svg" alt="Edit" /><img className="cursor-pointer" onClick={() => handleDelete(item._id)} src="../svgs/delete.svg" alt="Delete" /></div></td>
								</tr>
							})}

						</tbody>
					</table>
					<section className="overflow-hidden rounded-xl visible md:hidden">
						{users.map((item, index) => {
							return <div key={index} className="bg-sky-100  pb-4">
								<div className="bg-sky-800 text-white px-3 py-1">{item.sitename}</div>
								<div className="p-1 pl-8">
									<p className="flex gap-2 flex-wrap"><span className="font-bold">username:</span> {item.username}<img onClick={() => copyText(item.username)} className="w-5 cursor-pointer" src="../svgs/copy.svg" alt="copy Text" /></p>
									<p className="flex gap-2"><span className="font-bold">password:</span> {item.password}<img onClick={() => copyText(item.username)} className="w-5 cursor-pointer" src="../svgs/copy.svg" alt="copy Text" /></p>
									<div className="flex gap-3 text-lg">
										<img className="cursor-pointer" onClick={() => handleEdit(item._id)} src="../svgs/edit.svg" alt="Edit" />
										<img className="cursor-pointer" onClick={() => handleDelete(item._id)} src="../svgs/delete.svg" alt="Delete" />
									</div>
								</div>
							</div>
						})}

					</section>
				</div>
				}
			</div>
		</>
	);
};

export default Manager;
