import { useEffect, useState } from "react";
import write_side_image from "../assets/Images/write_side_image.png";
import user_profile from "../assets/Images/user_profile.png";
import { toast } from "react-toastify";
import {
  useCreatePostsMutation,
  useViewPostsMutation,
} from "../Slices/postApiSlice.js";
import { useSelector } from "react-redux";
import AllPostComponent from "../Components/postComponent.jsx";

const UserHomePage = () => {
  const { userInfo } = useSelector((state) => state.authentication);
  const [count, setCount] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [viewPosts] = useViewPostsMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await viewPosts();
        if (result.data) {
          setAllPosts(result.data.allPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [count, viewPosts]);

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
        <div className="hidden lg:block h-screen lg:w-1/4 rounded-lg  bg-slate-100 m-5 md:shadow-md text-center">
          <div className="flex m-5 flex-col  items-center justify-center">
            <div className="flex items-center">
              <img
                className="max-w-[150px] rounded-full border-4 border-blue-500 p-1"
                src={user_profile}
                alt=""
              />
              <div className="ml-4">
                <h4 className="text-lg font-bold">SenjithP</h4>
                <h5 className="text-sm text-gray-500">senjith@gmail.com</h5>
              </div>
            </div>
          </div>
          <hr className="m-4 border-t-2 border-blue-400" />
        </div>

        <div className="md:w-1/10 lg:w-1/2 text-center m-5 h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
          {allPosts.length > 0 ? (
            <AllPostComponent allPosts={allPosts} />
          ) : (
            <div>No Post found</div>
          )}
        </div>

        <div className="hidden lg:block h-screen lg:w-1/4 rounded-lg  bg-slate-200 m-5 md:shadow-md text-center">
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
