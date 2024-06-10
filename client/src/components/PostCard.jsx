import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import moment from "moment";

const PostCard = ({ post }) => {
  const user = post.userId;
  return (
    <div className="p-4 mx-auto mt-8 mb-8 bg-white dark:bg-[rgb(25,36,67)]  rounded-md sm:text-4/5 md:w-3/4 lg:w-1/2">
      <div className="px-4">
        {/* top div */}
        <div className="flex items-center gap-4">
          <div>
            <Link to={`/profile/${user._id}`}>
              <img
                src={user.profilePicture}
                alt="profile picture"
                className="object-cover rounded-full h-14 w-14"
              />
            </Link>
          </div>
          <p className="text-lg font-semibold">{user.fullname}</p>
          <p className="text-lg"> &middot;</p>
          <p className="text-md">{moment(post.createdAt).fromNow()}</p>
        </div>
        {/* content and image container for link */}
        <Link to={`post-detail/${post._id}`}>
          <div>
            {/* content div */}
            <div className="mt-8 mb-2">
              <p>{post.content}</p>
            </div>
            {/* image div */}
            <div className="mt-2">
              {post.postImage && (
                <img
                  src={post.postImage}
                  alt="post image"
                  className="object-contain w-full h-[400px] rounded-md "
                />
              )}
            </div>
          </div>
        </Link>
        {/* bottom */}
        <div className="flex items-center gap-2 pb-3 mt-8">
          <FaHeart className="text-2xl text-gray-600 dark:text-white" />
          <span>like</span>
        </div>
      </div>
    </div>
  );
};
export default PostCard;
