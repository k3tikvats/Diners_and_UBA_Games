import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LogIn() {
  const navigate = new useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setMessage(errorCode.split("/")[1])
        // ..
      });
    if (auth.currentUser.emailVerified) {
      navigate("/")
    } else {
      setVerify(true)
    }


  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-2xl shadow-md w-96">
    {verify && (
      <p className="text-red-500 text-sm text-center mb-2">
        Please Verify your email
      </p>
    )}
    {message && <p className="text-center text-gray-600 mb-4">{message}</p>}
    <h1 className="text-2xl font-semibold text-center mb-4">Log In</h1>
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="email" className="text-gray-700 font-medium mb-1">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <label htmlFor="password" className="text-gray-700 font-medium mb-1">
        Password:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <button
        className="bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        type="submit"
      >
        Log In
      </button>
    </form>
  </div>
</div>

  )
}