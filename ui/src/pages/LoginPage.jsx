import { React, useState } from "react";
import { LifeBuoy } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loginMutation, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="flex items-center justify-center h-screen p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side Form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <LifeBuoy className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Konvo
            </span>
          </div>

          {error && (
            <div className="alert alert-error shadow-lg mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold ">Welcome Back</h2>
                <p className="text-sm ">
                  Sign in to your account to continue your language journey
                </p>
              </div>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
              </div>

              <div className="form-control w-full mb-4">
                <label className="label cursor-pointer justify-start gap-2">
                  <span className="label-text">Forgot Password?</span>
                  <Link to="/login" className="text-primary">
                    Reset Password
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div className="divider my-4">OR</div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm ">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary">
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Right Side Image */}
        <div className="hidden lg:flex lg:w-1/2 w-full bg-primary/10 p-4 sm:p-8 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/i.png" alt="Sign Up" className="w-full h-full" />
            </div>
            <div className="text-center mt-6 space-y-3">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="text-sm opacity-70">
                Join our community and start learning today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
