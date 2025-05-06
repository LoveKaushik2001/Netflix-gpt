import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { removeUser, addUser } from "../utils/userSlice";
import { LOGO, Netflix_Logo_PMS, USER_AVATAR } from "../utils/constant";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
        console.error("Error signing out: ", error);
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-bottom from-black z-10 flex items-center justify-between w-full">
      <img
        src={Netflix_Logo_PMS}
        alt="Logo"
        className="w-44"
      />
      <div className="flex items-center space-x-4">
        <p className="font-bold">{user?.displayName || user?.email}</p>
        <img
          alt="userIcon"
          src={user ? USER_AVATAR : LOGO}
          className="w-12 h-12"
        />
        {user ?  (
          <button onClick={handleSignOut} className="font-bold cursor-pointer">
            (Sign out)
          </button>
        ) : ''}
      </div>
    </div>
  );
};

export default Header;
