import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Followers from "./pages/Followers";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import FooterComponent from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";
import PostDetail from "./pages/PostDetail";

import { logoutSuccess } from "./redux/user/userSlice";
import { checkAuthCookie } from "./utils/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (!checkAuthCookie()) {
  //     dispatch(logoutSuccess());
  //   }
  // }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/followers" element={<Followers />} />
        <Route element={<ProtectedComponent />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
        <Route element={<ProtectedComponent />}>
          <Route path="/post-detail/:postId" element={<PostDetail />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
};
export default App;
