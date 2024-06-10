import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CommentCard = ({ comment, post, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 bg-white dark:bg-[rgb(25,36,67)]  rounded-lg ">
      <div className="flex flex-row gap-4">
        {/* left div for avatar */}
        <div className="mt-2">
          <Link to={`/profile/${comment.userId._id}`}>
            <img
              src={comment.userId.profilePicture}
              alt="user"
              className="object-cover w-16 h-16 rounded-full "
            />
          </Link>
        </div>
        {/* right div */}
        <div className="flex flex-col justify-start flex-1">
          {/* upper div */}
          <div className="flex items-center gap-4">
            <p className="text-lg tracking-wide">
              <Link to={`/profile/${comment.userId._id}`}>
                @{comment.userId.username}
              </Link>
            </p>

            {currentUser._id === comment.userId._id ||
            currentUser._id === post.userId._id ? (
              <>
                <p className="text-lg">&middot;</p>
                <button onClick={() => onDelete(comment._id)}>Delete</button>
              </>
            ) : (
              <></>
            )}
          </div>
          {/* lower div */}

          <p>{comment.body}</p>
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
