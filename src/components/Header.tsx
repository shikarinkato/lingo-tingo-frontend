import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" flex justify-between items-center bg-gradient-to-r from-[#159957] to-[#155799] ">
      <h1 className=" text-[2rem] py-4 px-8 font-semibold text-white cursor-pointer">
        Lingo Tingo
      </h1>
      <div>
        <Link to="/">
          <span className="text-white font-semibold mr-4 cursor-pointer">
            Home
          </span>
        </Link>
        <Link to="/login">
          <span className="text-white font-semibold mr-4 cursor-pointer">
            Log in
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
