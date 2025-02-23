"use client"
import Loading from "@/components/Loading"
import { useGetUserQuery, useUpdateUserMutation, useUpdateProfilePictureMutation } from "@/features/user/userApi"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import noo from "@/images/noo.jpeg"

const UserAccount = () => {
  const { data: user, isLoading } = useGetUserQuery()
  const [updateUser] = useUpdateUserMutation()
  const [updateProfilePicture] = useUpdateProfilePictureMutation()
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        current_password: "",
        new_password: "",
        confirm_password: "",
      })
    }
  }, [user])

  const [selectedMenu, setSelectedMenu] = useState("profile")

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      await updateProfilePicture(file).unwrap()
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updateData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
    }

    if (formData.new_password && formData.current_password && formData.new_password === formData.confirm_password) {
      updateData.password = formData.new_password
      updateData.current_password = formData.current_password
    }

    try {
      await updateUser(updateData).unwrap()
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    )
  }
  if (!user) {
    router.push("/login")
  }

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-6 py-8 md:py-12">
      <div className="w-full  p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start">
          <div className="flex flex-col items-center mb-4 w-full md:w-auto">
            <img
              src={user.profile_picture ? `http://localhost:3003${user.profile_picture}` : noo.src}
              alt="Profile"
              className="w-64 h-64 rounded-full border mb-4"
            />
            {isEditing && <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />}
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-end mb-4 mt-4 md:mt-0">
              <button onClick={() => setIsEditing(!isEditing)} className="bg-black text-white px-4 py-2 rounded">
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </>
                ) : (
                  <>
                    <div className="border-2 break-words p-2 w-full">{user.first_name}</div>
                    <div className="border-2 break-words p-2 w-full">{user.last_name}</div>
                    <div className="border-2 break-words p-2 w-full">{user.email}</div>
                  </>
                )}
              </div>
              {isEditing && (
                <div className="mt-6">
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAccount

