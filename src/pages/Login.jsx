import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      // Only allow specific admin email(s)
      if (email === "gokulpriyan781@gmail.com") {
        navigate("/dashboard");
      } else {
        alert("Access denied. Not an admin.");
      }
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-600 text-white px-6 py-3 rounded shadow"
      >
        Sign in with Google
      </button>
    </div>
  );
}
