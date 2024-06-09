import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { logoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("api/user/logout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="bg-[#f5f5f5] border-b-2">
      <Link
        to="/"
        className="self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white">
        <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 ">
          Link
        </span>
        Up
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="hidden w-12 h-10 sm:inline bg-[#f5f5f5]"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}>
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }>
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={`/profile/${currentUser._id}`}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <Dropdown.Divider />
            <DropdownItem onClick={handleLogout}>Log out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button gradientDuoTone="purpleToBlue" outline>
              Login
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/followers"} as={"div"}>
          <Link to="/followers">Followers</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;
