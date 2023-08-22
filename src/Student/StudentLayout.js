import {
	AppstoreOutlined,
	ProfileOutlined,
	BookOutlined,
	FileDoneOutlined,
	PayCircleOutlined,
	LayoutOutlined,
	NotificationOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../UserContext";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
	return {
		key,
		icon,
		children,
		label,
		type
	};
}

const item2 = [
	getItem("Dashboard", "/student", <AppstoreOutlined />),
	getItem("Scholarships", "sub1", <PayCircleOutlined />, [
		getItem("View", "/student/scholarships"),
		getItem("Add", "/dashboard/addremainder")
	]),
	{
		type: "divider"
	},
	getItem("NPTEL", "sub2", <LayoutOutlined />, [
		getItem("View", "/student/nptel"),
		getItem("Add", "/dashboard/addremainder")
	]),
	{
		type: "divider"
	},
	getItem("Academics", "sub3", <BookOutlined />, [
		getItem("View", "/student/academics"),
		getItem("Add", "/dashboard/addremainder")
	]),
	{
		type: "divider"
	},
	getItem("Certificates", "sub4", <FileDoneOutlined />, [
		getItem("View", "/student/certificates"),
		getItem("Add", "/dashboard/addremainder")
	]),
	{
		type: "divider"
	},
	getItem("Notifications", "/student/notifications", <NotificationOutlined />),
	getItem("Profile", "/student/profile", <ProfileOutlined />)
];

export const StudentLayout = ({ page }) => {
	const { token, setToken } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
	});

	const {
		token: { colorBgContainer }
	} = theme.useToken();

	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<Layout hasSider>
			<Sider
				width={250}
				style={{
					height: "100vh",
					position: "fixed",
					left: 0,
					top: 0,
					bottom: 0
				}}
			>
				<div
					style={{
						height: "90vh", // Occupy full height of the Sider
						display: "flex",
						flexDirection: "column",
						overflow: "scroll"
					}}
				>
					<div
						style={{
							height: 32,
							margin: 16,
							color: "white",
							fontWeight: "600",
							fontSize: "22px",
							marginTop: "30px",
							marginBottom: "30px"
						}}
					>
						EMIS {!collapsed && "PORTAL"}
					</div>
					<Menu
						onClick={({ key }) => {
							navigate(key);
						}}
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["4"]}
						items={item2}
						className="menubar"
					/>
				</div>
			</Sider>

			<Layout
				className="site-layout"
				style={{
					marginLeft: 250
				}}
			>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
						width: "100%"
					}}
				/>
				<Content
					style={{
						margin: "24px 16px 0",
						overflow: "initial"
					}}
				>
					<div
						style={{
							padding: 24,
							textAlign: "center",
							background: colorBgContainer
						}}
					>
						{page}
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center"
					}}
				>
					DEPARTMENT OF IT 2024 GCT
				</Footer>
			</Layout>
		</Layout>
	);
};
