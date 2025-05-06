import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
        console.error("Error signing out: ", error);
      });
  };
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-bottom from-black z-10 flex items-center justify-between w-full">
      <img
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
        className="w-44"
      />
      <div className="flex items-center space-x-4">
        <p className="text-white font-bold">
          {user?.displayName || user?.email}
        </p>
        <img
          alt="userIcon"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          className="w-12 h-12"
        />
        <button onClick={handleSignOut} className="font-bold cursor-pointer">
          (Sign out)
        </button>
      </div>
    </div>
  );
};

export default Header;
