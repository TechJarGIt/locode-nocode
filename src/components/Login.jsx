import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { email, password, setIsAuthenticated, error, setError } = useContext(AuthContext);

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (inputEmail === email && inputPassword === password) {
      setIsAuthenticated(true);
      setError("");
      setSuccessMsg("Login successful!");
    } else {
      setIsAuthenticated(false);
      setSuccessMsg("");
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mt-4 max-w-md mx-auto border border-gray-200 p-6 rounded-lg">
      <h2 className="text-2xl mb-4 text-center text-gray-600">Login</h2>

      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="text"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-[#edf3dc] p-2 rounded">
          Login
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}
      </form>
    </div>
  );
}


// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {

//   return (
//     <div className="mt-4 max-w-md mx-auto border border-gray-200 p-6 rounded-lg">
//       <h2 className="text-2xl mb-4 text-center text-gray-600">
//         Login
//       </h2>

//       <form className="space-y-4">
//         <input
//           type="text"
//           value={email}
//           placeholder="Enter email"
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="password"
//           // value={password1}
//           placeholder="Enter password"
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <button className="w-full bg-[#edf3dc] p-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }