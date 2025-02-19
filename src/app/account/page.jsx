"use client";

import Loading from "@/components/Loading";
import { useGetUserQuery, useUpdateUserMutation, useUpdateProfilePictureMutation } from "@/features/user/userApi";
import { useEffect, useState } from "react";

const UserAccount = () => {
    const { data: user, isLoading } = useGetUserQuery();
    const [updateUser] = useUpdateUserMutation();
    const [updateProfilePicture] = useUpdateProfilePictureMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        current_password: "",
        new_password: "",
        confirm_password: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                current_password: "",
                new_password: "",
                confirm_password: ""
            });
        }
    }, [user]);

    const menuItems = [
        { name: "My Profile", key: "profile" },
        // { name: "Address Book", key: "address" },
        // { name: "My Payment Options", key: "payment" },
        // { name: "My Returns", key: "returns" },
        // { name: "My Cancellations", key: "cancellations" },
        { name: "My Wishlist", key: "wishlist" },
    ];

    const [selectedMenu, setSelectedMenu] = useState("profile");

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            await updateProfilePicture(file).unwrap();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updateData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email
        };

        if (formData.new_password && formData.current_password && formData.new_password === formData.confirm_password) {
            updateData.password = formData.new_password;
            updateData.current_password = formData.current_password;
        }

        try {
            await updateUser(updateData).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading />
            </div>
        )
    }

    return (
        <div className="flex px-6 py-12">
            {/* Sidebar */}
            <div className="w-1/4 border-r pr-4">
                <h2 className="font-bold mb-4">Manage My Account</h2>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.key}
                            className={`cursor-pointer mb-2 ${selectedMenu === item.key ? "text-red-500 font-semibold" : "text-gray-600"}`}
                            onClick={() => setSelectedMenu(item.key)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content */}
            <div className="w-3/4 p-6">
                {selectedMenu === "profile" && (
                    <div className="flex gap-8 items-start">
                        <div className="flex flex-col items-center mb-4">
                            <img
                                src={`http://localhost:3003${user.profile_picture}`}
                                alt="Profile"
                                className="w-52 h-52 rounded-full border mb-4"
                            />
                            {isEditing && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="text-sm"
                                />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="bg-black text-white px-4 py-2 rounded"
                                >
                                    {isEditing ? "Cancel" : "Edit Profile"}
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name || ""}
                                                onChange={handleInputChange}
                                                className="border-2 p-2 w-full"
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name || ""}
                                                onChange={handleInputChange}
                                                className="border-2 p-2 w-full"
                                                placeholder="Last Name"
                                            />
                                            {/* <input
                                                type="email"
                                                name="email"
                                                value={formData.email || ""}
                                                onChange={handleInputChange}
                                                className="border-2 p-2 w-full"
                                                placeholder="Email"
                                            /> */}
                                        </>
                                    ) : (
                                        <>
                                            <div className="border-2 p-2 w-full">{user.first_name}</div>
                                            <div className="border-2 p-2 w-full">{user.last_name}</div>
                                            <div className="border-2 p-2 w-full">{user.email}</div>
                                        </>
                                    )}
                                </div>
                                {isEditing && (
                                    <div className="mt-6">
                                        <h3 className="font-semibold mb-2">Change Password</h3>
                                        <input
                                            type="password"
                                            name="current_password"
                                            value={formData.current_password}
                                            onChange={handleInputChange}
                                            className="border-2 p-2 w-full mb-2"
                                            placeholder="Current Password"
                                        />
                                        <input
                                            type="password"
                                            name="new_password"
                                            value={formData.new_password}
                                            onChange={handleInputChange}
                                            className="border-2 p-2 w-full mb-2"
                                            placeholder="New Password"
                                        />
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            value={formData.confirm_password}
                                            onChange={handleInputChange}
                                            className="border-2 p-2 w-full mb-2"
                                            placeholder="Confirm New Password"
                                        />
                                        <div className="flex justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="bg-green-600 text-white px-4 py-2 rounded"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}
                {selectedMenu === "address" && (
                    <div>address</div>
                )}
            </div>
        </div>
    );
};

export default UserAccount;