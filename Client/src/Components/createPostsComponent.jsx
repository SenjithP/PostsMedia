import { useState } from "react";
import { toast } from "react-toastify";
import { useCreatePostsMutation } from "../Slices/postApiSlice";

const CreatePostsComponent = () => {
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
      await createPosts({ contentText }).unwrap();
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
    <div className="md:w-1/10 lg:w-1/2 text-center m-5 max-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
      <div className="flex items-center bg-white p-3 md:shadow-md rounded-lg">
        <div className="w-full">
          <form onSubmit={submitHandler}>
            <div className="flex gap-3">
              <textarea
                value={formData.contentText}
                onChange={handleInputChange}
                name="contentText"
                className="text-lg font-semibold mb-1 p-1 w-full border border-gray-300 rounded-md focus:outline-none"
                placeholder="Share Your Thoughts Here?"
              />
              <button
          type="submit"
          className=" bg-orange-700 hover:bg-orange-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
        >
          Post
        </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostsComponent;
