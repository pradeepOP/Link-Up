import { Button, Label, TextInput, Spinner, Alert } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const Login = () => {
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(logInFailure("Please fill out all fields."));
    }
    try {
      dispatch(logInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(logInFailure(data.message));
      }
      if (res.ok) {
        dispatch(logInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(logInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white ">
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500">
              Link
            </span>
            Up
          </Link>
          <p className="mt-5 text-sm">
            Connect, share, and discover with LinkUp. Stay up-to-date with the
            latest trends, find new interests, and connect with like-minded
            individuals from around the world.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
                autoComplete="email"
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

            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Log In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          <div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
