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
		let c = confirm("Do you really want to delete this data?")
		if (c) {
			setusers(users.filter(item => item.id !== id));
			localStorage.setItem("userData", JSON.stringify(users.filter(item => item.id !== id)));
			toast.success("Data Deleted!!", {
				position: "bottom-right",
				autoClose: 4000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "colored",
			})
		}
	}

	const handleEdit = (id) => {
		setuserData(users.filter(item => item.id === id)[0]);
	}

	const handleAddData = e => {
		e.preventDefault();
		if (userData.sitename && userData.username && userData.password) {
			if (userData.id) {
				let index = users.findIndex(item => item.id === userData.id);
				// let updatedArray = users;
				console.log(index);

				if (index !== -1) {
					// updatedArray = [...users.slice(0, index),
					// 	userData,
					// ...users.slice(index + 1)];
					console.log(users.slice(index + 1))
					setusers([...users.slice(0, index), userData, ...users.slice(index + 1)]);
					localStorage.setItem("userData", JSON.stringify([...users.slice(0, index), userData, ...users.slice(index + 1)]));
					toast.success("Credentials Updated", {
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
			} else {
				setusers([...users, { ...userData, id: uuidv4() }]);
				localStorage.setItem("userData", JSON.stringify([...users, { ...userData, id: uuidv4() }]));

				toast.success("Credentials Saved", {
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
			<ToastContainer pauseOnFocusLoss={false} />
			<div className="absolute inset-0 -z-10 h-full w-full bg-sky-50 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:14px_24px]">{/* <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-sky-500 opacity-20 blur-[100px]"></div> */}</div>
			<div className=" container mx-auto p-10 flex flex-col items-center">
				<h1 className=" text-3xl font-bold">
					<span className="text-sky-500">&#123;</span> Pass<span className="text-sky-500">Guard &#125;</span>
				</h1>
				<h3 className="text-sky-500">Where Security Meets Simplicity</h3>
				<form className="flex flex-col gap-4 w-full md:w-11/12 lg:w-1/2 my-8 items-center" action="">
					<section className="w-full">
						<input required value={userData.sitename} onChange={handleChange} name="sitename" placeholder="Enter The Website..." className="rounded-full p-1 text-sky-800 focus-visible:outline-sky-700 border border-sky-500 w-full text-sm lg:text-lg" type="text" />
					</section>
					<section className="flex gap-3 flex-col sm:flex-row md:gap-12 w-full">
						<input required value={userData.username} onChange={handleChange} name="username" placeholder="Enter Username" className="border p-1 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full text-sm lg:text-lg" type="text" />
						<div className="w-full  relative">
							<input required value={userData.password} onChange={handleChange} name="password" ref={passwordInputRef} placeholder="Enter Password" className="border p-1 focus-visible:outline-sky-700 text-sky-800 focus:border-sky-700 border-sky-500 rounded-full w-full text-sm lg:text-lg" type="password" />
							<img ref={visibleRef} className="absolute top-[5px] right-[8px] cursor-pointer" onClick={handleToogleVisible} src="svgs/notVisible.svg" alt="" />
						</div>
					</section>
					<button onClick={handleAddData} className="bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors duration-400 p-2 w-fit flex items-center text-sm lg:text-lg" type="submit">
						{/* <img src="Gifs/add-file.gif" alt="" /> */}
						{/* <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" colors="primary:#ffffff" className="w-[2px] h-[2px]"></lord-icon> */}
						<img src="svgs/save.svg" alt="save" className="mr-1 size-4 lg:size-5" />
						Save
					</button>
				</form>
				{users.length === 0 && <div>No Passwords Saved.</div>}
				{users.length !== 0 && <div className="w-full">

					<table className="min-w-full bg-sky-100 hidden md:table">
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
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700">{item.sitename}</td>
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700"><div className="flex gap-2">{item.username}<img onClick={() => copyText(item.username)} className="w-5 cursor-pointer" src="svgs/copy.svg" alt="copy Text" /></div></td>
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700"><div className="flex gap-2">{item.password}<img onClick={() => copyText(item.username)} className="w-5 cursor-pointer" src="svgs/copy.svg" alt="copy Text" /></div></td>
									<td className="text-sm lg:text-lg px-6 py-4 border-b border-sky-700"><div className="flex gap-3"><img className="cursor-pointer" onClick={() => handleEdit(item.id)} src="svgs/edit.svg" alt="Edit" /><img className="cursor-pointer" onClick={() => handleDelete(item.id)} src="svgs/delete.svg" alt="Delete" /></div></td>
								</tr>
							})}

						</tbody>
					</table>
					<section className="overflow-hidden rounded-xl visible md:hidden">
						{users.map((item, index) => {
							return <div key={index} className="bg-sky-100  pb-4">
								<div className="bg-sky-800 text-white px-3 py-1">{item.sitename}</div>
								<div className="p-1 pl-8">
									<p className="flex gap-2 flex-wrap"><span className="font-bold">username:</span> {item.username}<img onClick={() => copyText(item.username)} className="w-5 cursor-pointer" src="svgs/copy.svg" alt="copy Text" /></p>
									<p className="flex gap-2"><span className="font-bold">password:</span> {item.password}<img onClick={() => copyText(item.username)} className="w-5 cursor-pointer" src="svgs/copy.svg" alt="copy Text" /></p>
									<div className="flex gap-3 text-lg">
										<img className="cursor-pointer" onClick={() => handleEdit(item.id)} src="svgs/edit.svg" alt="Edit" />
										<img className="cursor-pointer" onClick={() => handleDelete(item.id)} src="svgs/delete.svg" alt="Delete" />
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
