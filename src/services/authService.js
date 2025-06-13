// const API_URL = "http://localhost:5137/auth";

// export const loginUser = async ({ email, password }) => {
//   try {
//     const res = await fetch(`${API_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     return await res.json();
//   } 
//   catch (err) {
//     console.log(err);    
//     return { msg: "Network error" };
//   }
// };

// export const registerUser = async (data) => {
//   try {
//     const res = await fetch(`${API_URL}/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     return await res.json();
//   } 
//   catch (err) {
//     console.log(err);    
//     return { msg: "Network error" };
//   }
// };
