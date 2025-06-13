import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { setEmail, setName, setNumber, setPassword } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    name: "",
    number: "",
    password: "",
    confirmPassword: ""
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, number, password, confirmPassword } = form;

    if (!email || !name || !number || !password || !confirmPassword) {
      setErrorMsg("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setEmail(email);
    setName(name);
    setNumber(number);
    setPassword(password);
    setErrorMsg("");
    setSuccessMsg("Registered successfully!");

    setForm({ email: "", name: "", number: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="mt-4 max-w-md mx-auto border border-gray-200 p-6 rounded-lg">
      <h2 className="text-2xl mb-4 text-center text-gray-600">Register</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="number"
          placeholder="Enter number"
          value={form.number}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-[#edf3dc] p-2 rounded">
          Register
        </button>
        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 text-sm">{successMsg}</p>}
      </form>

      <p className="mt-3 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400">Login</Link>
      </p>
    </div>
  );
}

// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import {AuthContext} from "../context/AuthContext";

// export default function Register() {
//   const {name, password, setEmail, setName, setNumber, setPassword} = useContext(AuthContext);
//   console.log(name+" - "+password);  

//   return (
//     <div className="mt-4 max-w-md mx-auto border border-gray-200 p-6 rounded-lg">
//       <h2 className="text-2xl mb-4 text-center text-gray-600">
//         Register
//       </h2>

//       <form className="space-y-4">
//         <label className="text-gray-700">Email</label>
//         <input
//           type="text"
//           placeholder="Enter email"
//           onChange={(e)=> setEmail(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <label className="text-gray-700 mb-2">Name</label>    
//         <input
//           type="text"
//           placeholder="Enter name"
//           onChange={(e)=> setName(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <label className="text-gray-700 mb-2">Number</label>
//         <input
//           type="number"
//           placeholder="Enter number"
//           onChange={(e)=> setNumber(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <label className="text-gray-700 mb-2">Password</label>
//         <input
//           type="password"
//           placeholder="Enter password"
//           onChange={(e)=> setPassword(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <label className="text-gray-700 mb-2">Confirm Password</label>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//         <button className="w-full bg-[#edf3dc] p-2 rounded">
//           Register
//         </button>
//       </form>
//       <p className="mt-3 text-center text-gray-600">
//         Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
//       </p>
//     </div>
//   );
// }