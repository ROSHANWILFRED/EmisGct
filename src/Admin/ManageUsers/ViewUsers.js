import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Divider, Table } from "antd";
import { api } from "../../const";
import { useContext } from "react";
import UserContext from "../../UserContext";

export const ViewUsers = () => {
	const { user, setUser, token, setToken } = useContext(UserContext);

	const [pageloading, setPageloading] = useState(true);
	const [userdata, setUserdata] = useState([]);

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Roll No",
			dataIndex: "roll_no",
			key: "roll_no"
		},
		{
			title: "Batch",
			dataIndex: "batch",
			key: "batch"
		},
		{
			title: "Password Set",
			dataIndex: "p_isset",
			key: "p_isset"
		}
	];

	const getUserDetails = async () => {
		try {
			const response = await fetch(`${api}/api/admin/getstudents`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					authorization: token
				}
			})
				.then((data) => data.json())
				.then((res) => {
					if (res.status) {
						setUserdata(res.data);
						console.log(res.data);
						setPageloading(false);
					} else {
						toast.error("Unable to Fetch Users");
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	return (
		<div>
			<Toaster></Toaster>
			<Divider orientation="left">Manage Users</Divider>
			{!pageloading && <Table dataSource={userdata} columns={columns} />}
		</div>
	);
};
