import { useEffect, useState } from "react";
import write_side_image from "../assets/Images/write_side_image.png";
import user_profile from "../assets/Images/user_profile.png";
import { toast } from "react-toastify";
import {
  useCreatePostsMutation,
  useViewPostsMutation,
} from "../Slices/postApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import PostComponent from "../Components/postComponent.jsx";
import no_post_found from "../assets/Images/no_post_found.jpg";
import { useUserLogoutMutation } from "../Slices/authenticationApiSlice.js";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../Slices/authenticationSlice.js";

const UserHomePage = () => {
  const { userInfo } = useSelector((state) => state.authentication);
  const [count, setCount] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [viewPosts] = useViewPostsMutation();
  const [receivedData, setReceivedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLogoutApiCall] = useUserLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      if (userInfo) {
        await userLogoutApiCall().unwrap();
        dispatch(userLogout());
        toast.success("Logout Successful");
        navigate("/userLogin");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  const handleDataFromChild = (count) => {
    console.log("Data received from child:", count);
    setReceivedData(count);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await viewPosts();
        if (result.data) {
          let filteredPosts = result.data.allPosts;

          if (searchQuery) {
            const lowercaseSearchQuery = searchQuery.toLowerCase();
            filteredPosts = filteredPosts.filter((post) =>
              post.contentText.toLowerCase().includes(lowercaseSearchQuery)
            );
          }

          setAllPosts(filteredPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } 
    };

    fetchData();
  }, [count, viewPosts, receivedData, searchQuery]);

  const handleInputChanges = (e) => {
    setSearchQuery(e.target.value);
  };

  const [formData, setFormData] = useState({
    contentText: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [createPosts] = useCreatePostsMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { contentText } = formData;

    try {
      await createPosts({ contentText, userId: userInfo.id }).unwrap();
      setFormData({ contentText: "" });
      setCount((prevCount) => prevCount + 1);
      toast.success("Post Added Successfully");
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
      <section className="flex flex-col md:flex-row ">
        <div className="lg:w-1/4 md:w-full bg-slate-100 m-5 md:shadow-md text-center">
          <div className="flex m-5 flex-col  items-center justify-center">
            <div className="flex items-center">
              <img
                className="max-w-[150px] rounded-full border-4 border-blue-500 p-1"
                src={user_profile}
                alt=""
              />
              <div className="ml-4">
                <h4 className="text-lg font-bold">{userInfo?.name}</h4>
                <h5 className="text-sm text-gray-500">{userInfo?.email}</h5>
              </div>
            </div>
          </div>
          <hr className="m-4 border-t-2 border-blue-400" />
          <label htmlFor="searchInput">Search Your Favorite</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChanges}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Search Posts"
            id="searchInput"
          />

          <button
            onClick={() => {
              logoutHandler();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="md:w-1/2 text-center m-5 h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
        {
          allPosts.length > 0 ? (
            <PostComponent
              allPosts={allPosts}
              onDataFromChild={handleDataFromChild}
            />
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                <img src={no_post_found} alt="no post" />
                <p className="pt-8 text-2xl font-semibold text-gray-800 mb-4">
                  No Posts found
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="lg:w-1/4 md:w-full bg-slate-200 m-5 md:shadow-md text-center">
          <div className="flex flex-col items-center justify-center">
            <img className=" mb-6" src={write_side_image} alt="" />
            <form onSubmit={submitHandler}>
              <textarea
                value={formData.contentText}
                onChange={handleInputChange}
                name="contentText"
                className="text-lg font-semibold mb-1 p-1 w-full min-h-96 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Share Your Thoughts Here..."
              />

              <button
                type="submit"
                className=" bg-orange-700 w-full hover:bg-orange-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserHomePage;
