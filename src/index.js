import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StudentLayout } from "./Student/StudentLayout";
import { StudentsDash } from "./Student/Dashboard/StudentsDash";
import { Scholarships } from "./Student/Scholarships/Scholarships";
import { Academics } from "./Student/Academics/Academics";
import { Certificates } from "./Student/Certificates/Certificates";
import { StudentNptel } from "./Student/NPTEL/StudentNptel";
import { StudentProfiles } from "./Student/Profile/StudentProfiles";
import { Login } from "./Common/Login/Login";
import { Notifications } from "./Student/Notifications/Notifications";
import Faq from "./Student/FAQ/Faq";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />
	},
	{
		path: "/student",
		element: (
			<>
				<StudentLayout page={<StudentsDash />} />
			</>
		)
	},
	{
		path: "/student/scholarships",
		element: (
			<>
				<StudentLayout page={<Scholarships />} />
			</>
		)
	},
	{
		path: "/student/nptel",
		element: (
			<>
				<StudentLayout page={<StudentNptel />} />
			</>
		)
	},
	{
		path: "/student/academics",
		element: (
			<>
				<StudentLayout page={<Academics />} />
			</>
		)
	},
	{
		path: "/student/certificates",
		element: (
			<>
				<StudentLayout page={<Certificates />} />
			</>
		)
	},
	{
		path: "/student/profile",
		element: (
			<>
				<StudentLayout page={<StudentProfiles />} />
			</>
		)
	},
	{
		path: "/student/notifications",
		element: (
			<>
				<StudentLayout page={<Notifications />}></StudentLayout>
			</>
		)
	},
	{
		path: "/faq",
		element: (
			<>
				<Faq/>
			</>
		)
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
