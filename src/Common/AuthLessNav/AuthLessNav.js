import React from "react";
import "./AuthLessNav.css";
import { useNavigate } from "react-router-dom";
const AuthLessNav = () => {
	const Navigate = useNavigate();
	return (
		<div className="authlessnavcont">
			<span className="authlessheader">
				EMIS PORTAL <span>GCT</span>{" "}
			</span>
			<div className="authlessnavbtn">
				<div className="authlessnavsup" onClick={()=>Navigate('/Faq')}>
					<i class="fa-solid fa-bullhorn"></i> 
					<span>FAQ</span>
				</div>
				<div className="authlessnavsup">
					<i class="fa-solid fa-headset"></i>
					<span>Support</span>
				</div>
			</div>
		</div>
	);
};

export default AuthLessNav ;
