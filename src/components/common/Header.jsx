import { Link } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Avatar from "../../assets/images/avatars/shanjoy-avater.png";
import Logo from "../../assets/images/shanjoy-logo.png";
import Logout from "../auth/Logout";
const Header = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[50px] rounded-full lg:max-w-[70px]"
            src={Logo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={HomeIcon} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>

          <Logout />

          <button className="flex-center !ml-8 gap-3">
            <span className="text-lg font-medium text-white lg:text-xl">
              Shanjoy
            </span>
            <img
              className="max-h-[32px] max-w-[32px] lg:max-h-[44px] lg:max-w-[44px]"
              src={Avatar}
              alt=""
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
