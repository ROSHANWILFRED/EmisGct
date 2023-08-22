import logo from "../../logo.svg";
// import "./App.css";
import { useEffect, useState } from "react";
import { Card, Space } from "antd";
import {
	UserOutlined,
	LockFilled,
	GoogleOutlined,
	FacebookOutlined,
	AppleOutlined,
	FacebookFilled,
	AppleFilled
} from "@ant-design/icons";
import { Input, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import  AuthLessNav  from "../AuthLessNav/AuthLessNav";

const { Text } = Typography;

export const Login = () => {
	return (
		<>
			<AuthLessNav></AuthLessNav>
			<div className="login">
				<div className="loginContainer">
					<div className="loginImageDiv">
					<img src={logo}  alt="logo" />
					</div>
					<div className="image_side_cont"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							paddingTop:"1%",
							paddingLeft: "5%",
							paddingRight: "5%",
						}}
					>
						<span className="logintitle" style={{ marginBottom: "20px" }}>
							LOGIN
						</span>
						<p style={{ textAlign: "center", marginBottom: "20px" }}>
							Enter GCT's emails ID and password
							<br />
						</p>
						<Input
							style={{ marginBottom: "20px" }}
							placeholder="Email"
							size="large"
						></Input>
						<Input
							style={{ marginBottom: "10px" }}
							placeholder="Password"
							size="large"
						></Input>
						<span className="login_forgot">Forgot Password ?</span>
						<button className="signInbtn" style={{ marginBottom: "20px" }}>
							Sign In
						</button>
						{/* <p style={{ marginBottom: "20px" }}>- or Sign in with -</p>
					<Space style={{ marginBottom: "20px" }}>
						<Button
							icon={<GoogleOutlined />}
							size={"large"}
							onClick={() => {
								// google();
							}}
						>
							Google
						</Button>
						<Button icon={<FacebookFilled />} size={"large"}>
							Facebook
						</Button>
						<Button icon={<AppleFilled />} size={"large"}>
							Apple
						</Button>
					</Space> */}
						<p style={{ textAlign: "center" }}>
							Don't have an account?{" "}
							<span style={{ fontWeight: "600", cursor: "pointer" }}>
								Contact the Adminstrator
							</span>{" "}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
