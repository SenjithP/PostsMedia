import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import user_profile from "../assets/Images/user_profile.png";
import PropTypes from "prop-types";
import { format } from "timeago.js";
import {
  useCreateCommentsMutation,
  useGetCommentPostMutation,
  useLikePostMutation,
} from "../Slices/postApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PostComponent = ({ allPosts, onDataFromChild }) => {
  const [count, setCount] = useState(0);

  const sendDataToParent = (count) => {
    onDataFromChild(count);
  };
  useEffect(() => {
    const simulatedData = count;
    sendDataToParent(simulatedData);
  }, [count]);
  const { userInfo } = useSelector((state) => state.authentication);
  const [showAll, setShowAll] = useState(0);
  const [showCommentAll, setShowCommentAll] = useState(0);
  const [createComments] = useCreateCommentsMutation();
  const [postComment, setPostComment] = useState([]);
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [
    postIdSentToBackEndGetCorrespondingComments,
    setPostIdSentToBackEndGetCorrespondingComments,
  ] = useState(null);
  const [commentClicked, setCommentClicked] = useState(false);
  const [getCommentPost] = useGetCommentPostMutation();
  const [likePost] = useLikePostMutation();

  const [formData, setFormData] = useState({
    postComment: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const commentSubmitHandler = async (e, postId) => {
    e.preventDefault();

    const { postComment } = formData;

    try {
      const userCommentId = userInfo.id;
      const result = await createComments({
        postId,
        postComment,
        userCommentId,
      }).unwrap();

      setFormData({ postComment: "" });
      setCommentClicked(true);
      toast.success("Comment added successfully");
    } catch (error) {
      if (error.data && error.data.error) {
        toast.error(error.data.error);
      } else {
        toast.error("An error occurred");
      }
    }
  };

  const handleCommentClick = async (postId) => {
    setShowCommentsMap((prevMap) => {
      const updatedMap = {};

      Object.keys(prevMap).forEach((prevPostId) => {
        updatedMap[prevPostId] = false;
      });

      updatedMap[postId] = !prevMap[postId];
      return updatedMap;
    });

    setPostIdSentToBackEndGetCorrespondingComments(postId);

    setCommentClicked(true);
  };

  useEffect(() => {
    if (commentClicked) {
      const fetchComments = async () => {
        try {
          const getCommentResult = await getCommentPost({
            id: postIdSentToBackEndGetCorrespondingComments,
          });

          if (getCommentResult.data) {
            const reversedComments = [...getCommentResult.data].reverse();
            setPostComment(reversedComments);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        } finally {
          setCommentClicked(false);
        }
      };

      fetchComments();
    }
  }, [
    getCommentPost,
    postIdSentToBackEndGetCorrespondingComments,
    commentClicked,
  ]);

  const handleLikeButtonClick = async (postId) => {
    await likePost({ postId }).unwrap();
    setCount((prevCount) => prevCount + 1);
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
           
          </div>

          <div className="px-5 text-justify">
            <p>
              {showAll === posts?._id
                ? posts?.contentText
                : posts?.contentText.slice(0, 500)}
              {posts?.contentText?.length > 501 &&
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
            <div className="flex gap-2 cursor-pointer">
              <div onClick={() => handleLikeButtonClick(posts?._id)}>
                {posts.likes?.includes(userInfo?.id) ? (
                  <AiOutlineLike size={20} color="blue" />
                ) : (
                  <AiOutlineLike size={20} Like />
                )}
              </div>
              <p >
                {posts?.likes?.length} Likes
              </p>
            </div>

            <div className="flex gap-2 cursor-pointer">
              <FaRegCommentDots />
              <h2
                onClick={() => {
                  handleCommentClick(posts._id);
                }}
              >
                COMMENT
              </h2>
            </div>

            
          </div>

          {/* COMMENTS  */}
          {showCommentsMap[posts._id] && (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commentSubmitHandler(e, posts._id);
                }}
              >
                <div className="flex items-center gap-4 border-t border-gray-300 p-4">
                  <img
                    src={user_profile}
                    className="w-9 h-9 rounded-full object-cover"
                    alt="Profile"
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder="What's on your mind?"
                      name="postComment"
                      onChange={handleInputChange}
                      value={formData.postComment}
                      className="w-full px-4 h-10 border-b border-solid border-blue-500 focus:outline-none focus:border-b-blue-700 text-16 leading-7 text-black placeholder:text-gray-500 rounded-md cursor-pointer"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-orange-700 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div
                className="comments-container scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300"
                style={{
                  maxHeight: "400px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <div>
                  {postComment && postComment.length > 0 ? (
                    postComment.map((comments, index) => (
                      <div key={index} className="w-full border-t-2 m-2 py-2">
                        <div className="flex gap-3 items-center mb-1">
                          <img
                            src={user_profile}
                            className="w-9 h-9 rounded-full object-cover"
                            alt="Profile"
                          />
                          <div>
                            <strong>
                              {" "}
                              <p className="font-medium text-base text-ascent-1">
                                {comments.userId.userName}
                              </p>
                            </strong>
                            <span className="text-ascent-2 text-sm">
                              {format(comments.updatedAt)}
                            </span>
                          </div>
                        </div>

                        <div className="ml-12 mr-8">
                          <p className="text-ascent-2 text-justify">
                            {showCommentAll === comments?._id
                              ? comments?.postComment
                              : comments?.postComment.slice(0, 300)}
                            {comments?.postComment?.length > 301 &&
                              (showCommentAll === comments?._id ? (
                                <span
                                  className="text-blue-600 ml-2 cursor-pointer"
                                  onClick={() => setShowCommentAll(0)}
                                >
                                  Show Less
                                </span>
                              ) : (
                                <span
                                  className="text-blue-600 ml-2 cursor-pointer"
                                  onClick={() =>
                                    setShowCommentAll(comments?._id)
                                  }
                                >
                                  Show More
                                </span>
                              ))}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-ascent-2 text-sm">
                      No comments available
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};

PostComponent.propTypes = {
  allPosts: PropTypes.array.isRequired,
  onDataFromChild: PropTypes.func.isRequired,
};

export default PostComponent;
