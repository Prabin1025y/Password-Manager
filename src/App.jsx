import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Manager from "./Components/Manager";
import Navbar from "./Components/Navbar";
import Login from "./Components/Register";
import Register from "./Components/Register";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './App.css'

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			{/* <Navbar /> */}
			{/* <Manager /> */}
			{/* <Login /> */}
			<Register />
		</>
	);
}

export default App;
