// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "./services/authService";
import { SmallIconAllert } from "./alerts/alerts.functions";
import LoaderComponent from "./dashboard/LoaderComponent";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const handleLogin = async () => {
    // router.push("/dashboard");
    // return
    setIsLoading(true)
    const result = await authService.login("/auth/login", { username, password });
    if(result!.status === 200){
      const data = await result!.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
      SmallIconAllert("success", "Credenciales validas");
    } else {
      SmallIconAllert("error", "Credenciales invalidas");
    }
    setIsLoading(false)
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {isLoading && <LoaderComponent />}
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">DocFlow Hub</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
