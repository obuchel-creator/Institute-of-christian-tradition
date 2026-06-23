import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
