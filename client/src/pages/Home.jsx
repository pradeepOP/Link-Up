import { Button, FileInput, Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [postImage, setPostImage] = useState(null);
  const contentInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        }
        setPosts(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleImageChange = (e) => {
    setPostImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (postImage) {
        data.append("postImage", postImage);
      }

      const res = await fetch("api/posts/", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setPosts([result, ...posts]);
        setFormData({});
        setPostImage(null);
        if (contentInputRef.current) {
          contentInputRef.current.value = "";
        }
        if (imageInputRef.current) {
          imageInputRef.current.value = null;
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  const isButtonDisabled = !formData.content?.trim() && !postImage;
  return (
    <div className="min-h-screen">
      {/* container */}
      <div className="px-3 mt-5 ">
        {/* form container */}
        {currentUser ? (
          <form
            onSubmit={handleSubmit}
            className="px-2 border-[1px] dark:border-white  rounded-lg border-gray-400 sm:w-4/5 mx-auto md:w-3/4 lg:w-1/2  ">
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
                ref={contentInputRef}
                className="w-full h-20 bg-[#f5f5f5] dark:bg-[rgb(16,23,42)] focus:ring-0 border-none placeholder:text-xl placeholder:tracking-wide"
                placeholder="What is happening?!"
                onChange={handleChange}
              />
            </div>
            {/* bottom div */}
            <div className="flex justify-between py-4">
              <FileInput
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button
                type="submit"
                gradientDuoTone="purpleToPink"
                disabled={isButtonDisabled}>
                Post
              </Button>
            </div>
          </form>
        ) : (
          <></>
        )}
        <div>
          {loading && (
            <div className="flex items-center justify-center mt-20">
              <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
          )}
          {error && <p>Eror: {error}</p>}
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
