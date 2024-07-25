import { ToastContainer } from "react-toastify";
import Login from "./Components/Login";
import Manager from "./Components/Manager";
import Register from "./Components/Register";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import './App.css'


function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Manager />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/register",
			element: <Register />,
		},
	]);

	return (
		<>
			<ToastContainer pauseOnFocusLoss={false} />
			<RouterProvider router={router} />
			{/* <Navbar /> */}
			{/* <Manager /> */}
			{/* <Login /> */}
			{/* <Register /> */}
		</>
	);
}

export default App;
