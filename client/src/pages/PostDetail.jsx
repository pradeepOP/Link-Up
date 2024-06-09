import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import moment from "moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const PostDetail = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(true);
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
          setLoading(false);
        } else {
          setPost(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        setPost(null);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      {/* container */}
      <div className="p-4 mx-auto mt-8 mb-8 rounded-md sm:text-4/5 md:w-3/4 lg:w-1/2">
        {post && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 mb-3">
              <div>
                <Link to={`/profile/${post.userId._id}`}>
                  <img
                    src={post.userId.profilePicture}
                    alt="profile picture"
                    className="object-cover rounded-full h-14 w-14"
                  />
                </Link>
              </div>
              <p className="text-sm font-semibold md:text-lg">
                {post.userId.fullname}
              </p>
              <p className="text-lg"> &middot;</p>
              <p className="text-sm md:text-lg">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
            {currentUser.fullname === post.userId.fullname ? (
              <span className="text-xl duration-300 cursor-pointer md:text-2xl hover:text-red-400">
                <RiDeleteBin5Line onClick={() => setShowModal(true)} />
              </span>
            ) : (
              <></>
            )}
          </div>
        )}

        <div>
          {loading && (
            <div className="flex items-center justify-center mt-20">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          )}
        </div>
        {/* top div for image */}
        {post && post.postImage && (
          <div>
            <img
              src={post.postImage}
              alt="post image"
              className="w-full h-[400px] object-cover rounded-md "
            />

            <div className="flex items-center gap-2 pb-3 mt-4">
              <FaHeart className="text-2xl text-gray-600 dark:text-white" />
              <span>like</span>
            </div>
          </div>
        )}

        {/* div for content */}

        <div className="mt-5 leading-snug">{post && <p>{post.content}</p>}</div>
        {/* middle div for comment form */}
        <div className="mt-8">
          {currentUser ? (
            <form className="px-2 border-[1px] dark:border-white bg-white/60 dark:bg-[rgb(25,36,67)]  rounded-lg border-gray-400   ">
              {/* top div */}
              <div className="flex items-center gap-2 border-b border-gray-400 dark:border-white ">
                <div>
                  <Link to={`/profile/${currentUser._id}`}>
                    <img
                      src={currentUser.profilePicture}
                      alt="user"
                      className="object-cover w-16 h-auto rounded-full "
                    />
                  </Link>
                </div>
                <input
                  type="text"
                  id="content"
                  className="w-full h-20 bg-white/60 dark:bg-[rgb(25,36,67)] focus:ring-0 border-none placeholder:text-xl placeholder:tracking-wide"
                  placeholder="Write comments......"
                />
              </div>
              {/* bottom div */}
              <div className="flex justify-between py-4">
                <Button type="submit" gradientDuoTone="purpleToPink">
                  Post
                </Button>
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
        {/* bottom div for comment */}
        <div className="mt-8">
          <h1 className="text-2xl font-semibold">Comments</h1>
        </div>
      </div>
      {/* Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PostDetail;
