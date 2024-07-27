import { ToastContainer } from "react-toastify";
import Login from "./Components/Login";
import Manager from "./Components/Manager";
import Register from "./Components/Register";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WelcomePage from "./Components/Welcome";

// import './App.css'


function App() {
	const router = createBrowserRouter([
		{
			path: "/home/:currentUserId",
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
		{
			path: "/",
			element: <WelcomePage />,
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
