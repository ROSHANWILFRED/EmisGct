import { Children, createContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
	const getToken = () => {
		const token = localStorage.getItem("token");
		if (token) {
			return token;
		} else return "";
	};
	const [token, setToken] = useState(getToken());
	const [user, setUser] = useState({});

	return (
		<UserContext.Provider
			value={{ token: token, setUser: setUser, user: user, setToken: setToken }}
		>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
