import React, { useState } from "react";
import "./users.css";
import { Row, Col, Divider, Form, Input, Select, Button, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../../const";
import * as XLSX from "xlsx";
import { useContext } from "react";
import UserContext from "../../UserContext";

export const AddUsers = () => {
	const { user, setUser, token, setToken } = useContext(UserContext);

	const [form] = Form.useForm();
	const [form2] = Form.useForm();
	const [filelist, setFilelist] = useState([]);
	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [batch, setbatch] = useState("");
	const [type, settype] = useState(0);
	const [roll_no, setroll_no] = useState("");

	const [batch2, setbatch2] = useState("");
	const [type2, settype2] = useState(0);

	const [userlist, setuserlist] = useState([]);

	const handleFileUpload = (event) => {
		const file = event;
		const reader = new FileReader();

		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

			const headers = jsonData[0];
			const convertedData = jsonData.slice(1).map((row) => {
				const obj = {};
				headers.forEach((header, index) => {
					obj[header] = row[index];
				});
				return obj;
			});

			console.log(convertedData);
			setuserlist(convertedData);
		};

		reader.readAsArrayBuffer(file);
	};

	const addIndividualUser = async () => {
		try {
			const value = {
				p_isset: false,
				password: "admin",
				name: name,
				type: type,
				email: email
			};

			if (type === 0) {
				value["batch"] = batch.toString();
				value["roll_no"] = roll_no;
			}

			const response = await fetch(`${api}/api/users/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(value)
			})
				.then((data) => data.json())
				.then((res) => {
					if (res.status === true) {
						form.resetFields();
						toast.success("User Added Successfully");
					} else {
						toast.error(res.message);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	const addBatchUsers = async () => {
		const defaultProperties = {
			p_isset: false,
			password: "admin",
			type: 0,
			batch: batch2
		};

		const usersWithDefaults = userlist.map((user) => ({
			...user,
			roll_no: user.roll_no.toString(),
			...defaultProperties
		}));
		try {
			const value = {
				users: usersWithDefaults
			};
			console.log(value);
			const response = await fetch(`${api}/api/admin/bulkusers`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: token
				},
				body: JSON.stringify(value)
			})
				.then((data) => data.json())
				.then((res) => {
					if (res.status === true) {
						toast.success("Users Added Successfully");
						form2.resetFields();
					} else {
						toast.error(res.message);
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="AddUsers">
			<Toaster></Toaster>

			<Divider orientation="left">Add Individual Users</Divider>
			<div className="addinuser">
				<div className="inputele">
					<Form form={form} onFinish={addIndividualUser} autoComplete="off">
						<Row gutter={[32, 16]}>
							<Col span={12}>
								<Form.Item label="User Type">
									<Select defaultValue={0} onChange={(e) => settype(e)}>
										<Select.Option value={0}>Student</Select.Option>
										<Select.Option value={1}>Staff</Select.Option>
										<Select.Option value={2}>Admin</Select.Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={"Name"}
									name={"Name"}
									rules={[{ required: true }]}
								>
									<Input
										onChange={(e) => setname(e.target.value)}
										style={{ width: "100%" }}
										placeholder="Name"
									></Input>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={"GCT Email"}
									name={"GCT Email"}
									rules={[{ required: true }]}
								>
									<Input
										onChange={(e) => setemail(e.target.value)}
										style={{ width: "100%" }}
										placeholder="something@gct.ac.in"
									></Input>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={"Batch"}
									name={"Batch"}
									rules={[{ required: type != 0 ? false : true }, { len: 4 }]}
								>
									<Input
										disabled={type != 0 ? true : false}
										type="number"
										onChange={(e) => setbatch(e.target.value)}
										style={{ width: "100%" }}
										placeholder="Ex:2024,2025"
									></Input>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={"Roll Numb"}
									name={"Roll Number"}
									rules={[{ required: type != 0 ? false : true }]}
								>
									<Input
										disabled={type != 0 ? true : false}
										onChange={(e) => setroll_no(e.target.value)}
										style={{ width: "100%" }}
										placeholder="Ex:2018118"
									></Input>
								</Form.Item>
							</Col>
							<Col span={12}></Col>
						</Row>

						<Form.Item>
							<div className="addindibtn">
								<Button htmlType="reset">Reset</Button>
								<div style={{ width: "10px" }}></div>
								<Button htmlType="submit" type="primary">
									Add User
								</Button>
							</div>
						</Form.Item>
					</Form>
				</div>
			</div>
			<Divider orientation="left">Add Batch Users</Divider>
			<div className="addbatchuser">
				<span className="addbatchuseralert">
					*use this option only to add list of students as users from excel file
					| Excel File should contain only one sheet with "name", "rollno",
					"email" as columns
				</span>
				<div className="inputele">
					<Form form={form2} autoComplete="off" onFinish={addBatchUsers}>
						<Row gutter={[32, 16]}>
							<Col span={12}>
								<Form.Item label="User Type">
									<Select defaultValue={0} disabled>
										<Select.Option value={0}>Student</Select.Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label={"Batch"}
									name={"Batch"}
									onChange={(e) => setbatch2(e.target.value)}
									rules={[{ required: true }, { type: "string", len: 4 }]}
								>
									<Input
										type="number"
										style={{ width: "100%" }}
										placeholder="Ex:2024,2025"
									></Input>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									label="Excel File"
									valuePropName="fileList"
									name={"upload"}
									getValueFromEvent={() => {}}
								>
									<Upload
										maxCount={1}
										beforeUpload={(file) => {
											console.log(file);
											handleFileUpload(file);
											setFilelist([
												{
													uid: file.uid,
													name: file.name,
													status: "done",
													url: ""
												}
											]);

											return false;
										}}
										accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
										listType="picture-card"
									>
										<div>
											<PlusOutlined />
											<div
												style={{
													marginTop: 8
												}}
											>
												Upload
											</div>
										</div>
									</Upload>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item>
							<div className="addindibtn">
								<Button htmlType="reset">Reset</Button>
								<div style={{ width: "10px" }}></div>
								<Button htmlType="submit" type="primary">
									Add Batch Users
								</Button>
							</div>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
};
