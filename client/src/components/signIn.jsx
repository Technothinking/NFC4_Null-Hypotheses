import React from "react";

export default function Signin({ setShowDashboard }) {
  return (
    <div className="flex h-screen w-screen font-sans text-gray-800">
      {/* LEFT SIDE - About Us */}
      <div className="w-2/3 bg-gradient-to-br from-blue-100 to-blue-300 p-12 flex flex-col justify-center">
        <div>
          <h1 className="text-5xl font-bold text-blue-900 mb-4">SMARTSEVA</h1>
          <p className="text-lg text-gray-700 max-w-xl mb-6">
            Welcome to <span className="font-semibold text-blue-800">SMARTSEVA</span> – your one-stop destination for streamlined solutions. We specialize in providing smart tools, engaging content, and personalized experiences to help you succeed. Whether you're a student, a professional, or an explorer — we’ve got something for you!
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Sign In */}
      <div className="w-1/3 bg-white flex items-center justify-center shadow-xl">
        <div className="w-full max-w-sm p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Sign In</h2>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            setShowDashboard(true);
          }}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}