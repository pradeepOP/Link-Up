import {
  Button,
  Modal,
  Label,
  TextInput,
  FileInput,
  Alert,
  Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateFailure,
  updateSuccess,
} from "../redux/user/userSlice";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(currentUser);
  // console.log(userId);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: [e.target.value] });
  };
  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (profilePicture) {
        data.append("profilePicture", profilePicture);
      }

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        body: data,
      });

      const result = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(result.message));
      } else {
        setShowModal(false);
        dispatch(updateSuccess(result));
        setUser(result);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setUserError(null);
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
        if (data.success === false) {
          setUserError(data.message);
        }
        setLoading(false);
      } catch (error) {
        setUserError(error);
      }
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="min-h-screen px-4 md:px-20 ">
      {/* container */}
      <div className="w-full mx-auto md:w-2/3">
        {/* top div */}
        <div className="flex flex-col w-full gap-8 px-4 md:items-center md:flex-row md:gap-20">
          {/* left div */}
          <div>
            {user && (
              <img
                src={user.profilePicture}
                alt="profile-picture"
                className="object-cover w-32 h-auto mt-10 border-2 rounded-full md:h-60 md:w-60"
              />
            )}
          </div>
          {/* right div */}
          <div className="flex-1 md:pt-10">
            {/* upper div */}
            <div className="flex items-center gap-10 mb-8 md:gap-20 md:justify-between ">
              {user && (
                <p className="font-semibold tracking-wider md:text-2xl">
                  @{user.username}
                </p>
              )}

              {user && currentUser.username === user.username ? (
                <Button onClick={() => setShowModal(true)} color="dark">
                  Edit Profile
                </Button>
              ) : (
                <></>
              )}

              {/* Modal */}
              <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size="md">
                <Modal.Header />
                <Modal.Body>
                  <div className="">
                    <h3 className="mb-5 text-xl font-semibold text-gray-700 dark:text-gray-400">
                      Update Profile
                    </h3>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4">
                      <div>
                        <Label value="Full Name" />
                        <TextInput
                          type="text"
                          placeholder="Enter fullname"
                          id="fullname"
                          value={formData.fullname || currentUser.fullname}
                          onChange={handleChange}
                          autoComplete="fullname"
                        />
                      </div>
                      <div>
                        <Label value="Username" />
                        <TextInput
                          type="text"
                          placeholder="Enter username"
                          id="username"
                          value={formData.username || currentUser.username}
                          onChange={handleChange}
                          autoComplete="username"
                        />
                      </div>
                      <div>
                        <Label value="Email" />
                        <TextInput
                          type="email"
                          placeholder="name@company.com"
                          id="email"
                          value={formData.email || currentUser.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                      </div>
                      <div>
                        <Label value="Bio" />
                        <TextInput
                          type="text"
                          placeholder="Enter your bio"
                          id="bio"
                          maxLength={200}
                          value={formData.bio || currentUser.bio}
                          onChange={handleChange}
                          autoComplete="bio"
                        />
                      </div>
                      <div>
                        <Label value="Profile picture" />
                        <FileInput
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </div>
                      <div>
                        <Label value="Password" />
                        <TextInput
                          type="password"
                          placeholder="*********"
                          id="password"
                          onChange={handleChange}
                          autoComplete="current-password"
                        />
                      </div>
                      <div>
                        <Label value="Confirm Password" />
                        <TextInput
                          type="password"
                          placeholder="*********"
                          id="confirmPassword"
                          onChange={handleChange}
                          autoComplete="current-password"
                        />
                      </div>
                      <Button gradientDuoTone="purpleToPink" type="submit">
                        update
                      </Button>
                      {error && (
                        <Alert color="failure" className="mt-5">
                          {error}
                        </Alert>
                      )}
                    </form>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            {/* middle div */}
            <div className="flex items-center gap-10 mb-8 text-lg md:gap-20">
              <p className="space-x-1">0 post</p>
              <p className="space-x-1">0 followers</p>
              <p className="space-x-1">10 following</p>
            </div>
            {/* bottom div */}
            <div className="space-y-1">
              {user && (
                <>
                  <p className="text-lg tracking-wide">{user.fullname}</p>
                  <p>{user.bio}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* bottom div */}
        <div></div>
        {loading && (
          <div className="flex items-center justify-center mt-20">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
