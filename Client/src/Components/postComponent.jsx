import { useState } from "react";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import user_profile from "../assets/Images/user_profile.png";
import PropTypes from "prop-types";
import { format } from "timeago.js";

const AllPostComponent = ({ allPosts }) => {
  const [showAll, setShowAll] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };
  return (
    <>
      {allPosts.map((posts) => (
        <div
          key={posts.id}
          className="bg-white mt-5 rounded-lg md:shadow-md scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300"
        >
          <div className="flex p-5 gap-5 items-start">
            <div className="flex-shrink-0">
              <img
                src={user_profile}
                alt="Profile"
                className="rounded-full w-16 h-16 object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mt-1">
                {posts.userId.userName}
              </h2>
              <h5 className="text-sm text-gray-500">
                {format(posts.createdAt)}
              </h5>
            </div>
            <div className="ml-auto">
              <h6 className="text-sm text-gray-500">Delete</h6>
            </div>
          </div>

          <div className="px-5 text-justify">
            <p>
              {showAll === posts?._id
                ? posts?.contentText
                : posts?.contentText.slice(0, 300)}
              {posts?.contentText?.length > 301 &&
                (showAll === posts?._id ? (
                  <span
                    className="text-blue-600 ml-2 cursor-pointer"
                    onClick={() => setShowAll(0)}
                  >
                    Show Less
                  </span>
                ) : (
                  <span
                    className="text-blue-600 ml-2 cursor-pointer"
                    onClick={() => setShowAll(posts?._id)}
                  >
                    Show More
                  </span>
                ))}
            </p>
          </div>

          <div className="flex mt-5 pb-5 justify-around text-center">
            <div className="flex gap-2">
              <SlLike />
              <h2>LIKE</h2>
            </div>
            <div
              className="flex gap-2 cursor-pointer"
              onClick={handleCommentClick}
            >
              <FaRegCommentDots />
              <h2>COMMENT</h2>
            </div>

            <div className="flex gap-2">
              <CiSaveDown2 />
              <h2>SAVE</h2>
            </div>
          </div>

          {/* COMMENTS  */}
          {showComments && (
            <>
              <div className="flex items-center gap-4 border-t border-gray-300 p-4">
                <img
                  src={user_profile}
                  className="w-9 h-9 rounded-full object-cover"
                  alt="Profile"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="What's on your mind?"
                    name="comment"
                    className="w-full px-4 h-10 border-b border-solid border-blue-500 focus:outline-none focus:border-b-blue-700 text-16 leading-7 text-black placeholder:text-gray-500 rounded-md cursor-pointer"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1 bg-orange-700 text-white rounded-md hover:bg-orange-600 focus:outline-none"
                >
                  Submit
                </button>
              </div>
              <div className="w-full border-t-2 m-2 py-2">
                <div className="flex gap-3 items-center mb-1">
                  <img
                    src={user_profile}
                    className="w-9 h-9 rounded-full object-cover"
                    alt="Profile"
                  />
                  <div>
                    <p className="font-medium text-base text-ascent-1">
                      Robert R
                    </p>
                    <span className="text-ascent-2 text-sm">14-08-2023</span>
                  </div>
                </div>

                <div className="ml-12 mr-8">
                  <p className="text-ascent-2 text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt, maiores vel laborum voluptatum molestiae saepe itaque
                    eveniet tenetur, impedit illum nisi animi fugit repudiandae
                    distinctio maxime quam est minima quis?
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

AllPostComponent.propTypes = {
  allPosts: PropTypes.array.isRequired,
};

export default AllPostComponent;
