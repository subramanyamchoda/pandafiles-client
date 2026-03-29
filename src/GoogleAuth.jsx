import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const GoogleAuth = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      const { data } = await axios.post(
        "https://panda-files.onrender.com/auth/google",
        { token: credential },
        { withCredentials: true }
      );

      const formattedUser = {
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || "https://via.placeholder.com/150",
        id: data.user._id,
      };

      setUser(formattedUser);
      localStorage.setItem("user", JSON.stringify(formattedUser));
      localStorage.setItem("userId", formattedUser.id);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-600 via-gray-900 to-gray-800 px-4">

        {/* MAIN CARD */}
        <div className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">

          <div className="bg-gray-900 rounded-3xl p-8 text-center shadow-2xl">

            {/* LOGO */}
            <div className="text-6xl mb-4 animate-pulse">🐼</div>

            {/* TITLE */}
            <h2 className="text-3xl font-extrabold text-white">
              Panda Files
            </h2>

            <p className="text-gray-400 mt-2 text-sm">
              Secure cloud storage for your files
            </p>

            {/* GOOGLE LOGIN */}
            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => alert("Google login failed")}
              />
            </div>

            {/* DIVIDER */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-700"></div>
              <span className="px-3 text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            {/* EXTRA INFO */}
            <p className="text-xs text-gray-500">
              Fast • Secure • Reliable
            </p>

            {/* FOOTER */}
            <p className="text-[10px] text-gray-600 mt-6">
              © 2026 Panda Files • Powered by Google Auth
            </p>

          </div>
        </div>

      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;