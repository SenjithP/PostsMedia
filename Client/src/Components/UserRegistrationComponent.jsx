import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserRegistrationMutation } from "../Slices/authenticationApiSlice";
import { toast } from "react-toastify";

const UserRegistrationComponent = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const navigate = useNavigate();
  const [userRegistration] = useUserRegistrationMutation();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { userName, userEmail, userPassword } = formData;
    try {
      await userRegistration({
        userName,
        userEmail,
        userPassword,
      }).unwrap();
      navigate("/userLogin");
    } catch (error) {
      if (error.data && error.data.error) {
        toast.error(error.data.error);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <>
      <div className="rounded-l-lg py-5 text-center lg:pl-16">
        <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
          Create Your <span className="text-orange-700">Account</span>
        </h3>

        <form onSubmit={submitHandler}>
          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={formData.userEmail}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              name="userEmail"
              className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={formData.userPassword}
              onChange={handleInputChange}
              placeholder="Enter Your Password"
              name="userPassword"
              className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
              required
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-orange-700 hover:bg-orange-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-5 text-black text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 font-medium ml-1" to={"/userLogin"}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default UserRegistrationComponent;
