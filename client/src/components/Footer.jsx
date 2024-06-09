import { Footer, FooterDivider } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
const FooterComponent = () => {
  return (
    <Footer container className="border-t-8 border-teal-500 bg-[#f5f5f5]">
      <div className="w-full mx-auto max-w-7xl ">
        <div className="">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white">
              <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 ">
                Link
              </span>
              Up
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" target="_blank" rel="noopener noreferrer">
                  Home
                </Footer.Link>
                <Footer.Link
                  href="/followers"
                  target="_blank"
                  rel="noopener noreferrer">
                  Followers
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  Facebook
                </Footer.Link>
                <Footer.Link
                  href="https://github.com/pradeepOP"
                  target="_blank"
                  rel="noopener noreferrer">
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full space-y-2 sm:flex sm:items-center sm:justify-between ">
          <Footer.Copyright
            href="#"
            by="Pradeep Chhetri"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 sm:flex sm:items-center sm:justify-between">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};
export default FooterComponent;
