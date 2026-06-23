import React, { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password has been reset!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
