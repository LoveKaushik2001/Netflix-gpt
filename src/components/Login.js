import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice"; 

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current.value,
      password.current.value,
      name.current ? name.current.value : null
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      // Handle sign-up logic here
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setErrorMessage(errorCode + " - " + errorMessage);
            });
          console.log("User signed up:", user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      // Handle sign-in logic here
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-screen">
      <Header />
      <div className="absolute top-0 left-0 w-full h-full">
        <img
          src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f562aaf4-5dbb-4603-a32b-6ef6c2230136/dh0w8qv-9d8ee6b2-b41a-4681-ab9b-8a227560dc75.jpg/v1/fill/w_1280,h_720,q_75,strp/the_netflix_login_background__canada__2024___by_logofeveryt_dh0w8qv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZjU2MmFhZjQtNWRiYi00NjAzLWEzMmItNmVmNmMyMjMwMTM2XC9kaDB3OHF2LTlkOGVlNmIyLWI0MWEtNDY4MS1hYjliLThhMjI3NTYwZGM3NS5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.LOYKSxIDqfPwWHR0SSJ-ugGQ6bECF0yO6Cmc0F26CQs"
          className="top-0 left-0 w-full h-full object-cover -z-10"
          alt="Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 w-full max-w-md p-8 bg-black/70 rounded-md transform -translate-x-1/2 -translate-y-1/2 text-white space-y-4 shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition-colors p-3 rounded font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {/* <div className="flex justify-between items-center text-sm text-gray-400">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Remember me</span>
          </label>
          <a href="#" className="hover:underline">
            Need help?
          </a>
        </div> */}
        <div className="text-sm text-gray-400 mt-6">
          {isSignInForm ? "New to Netflix? " : "Already have an account? "}
          <p
            onClick={toggleSignInForm}
            className="text-white hover:underline cursor-pointer"
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
