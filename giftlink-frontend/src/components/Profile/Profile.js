import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';

const Profile = () => {

    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [changed, setChanged] = useState("");
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            const name = sessionStorage.getItem('name');
            if (name || authtoken) {
                const storedUserDetails = {
                    name: name,
                    email: email,
                    password: ""
                };

                setUserDetails(storedUserDetails);
                setUpdatedDetails(storedUserDetails);
            }
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/app/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");

            if (!authtoken || !email) {
                navigate("/app/login");
                return;
            }
            let message = "";

            if (userDetails.name != updatedDetails.name && updatedDetails.password != "") {
                message = "Name and Password";
            }
            else if (userDetails.name != updatedDetails.name) {
                message = "Name";
            }
            else if (updatedDetails.password != "") {
                message = "Password";
            }

            const payload = { ...updatedDetails };
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/update`, {
                //Step 1: Task 1
                //Step 1: Task 2
                //Step 1: Task 3
            });

            if (response.ok) {
                // Update the user details in session storage
                //Step 1: Task 4
                //Step 1: Task 5
                setUserDetails(updatedDetails);
                setEditMode(false);
                setUpdatedDetails((prevState) => ({
                    ...prevState,
                    password: "",
                }));
                // Display success message to the user
                setChanged(`${message} Changed Successfully!`);
                setTimeout(() => {
                    setChanged("");
                    navigate("/");
                }, 1000);

            } else {
                // Handle error case
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    return (
        <div className="profile-container">
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            disabled // Disable the email field
                        />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={updatedDetails.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="text"
                            name="password"
                            value={updatedDetails.password}
                            onChange={handleInputChange}
                        />
                    </label>

                    <button type="submit">Save</button>
                </form>
            ) : (
                <div className="profile-details">
                    <h1>Hi, {userDetails.name}</h1>
                    <p> <b>Email:</b> {userDetails.email}</p>
                    <button onClick={handleEdit}>Edit</button>
                    <span style={{ color: 'green', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>{changed}</span>
                </div>
            )}
        </div>
    );
};

export default Profile;
