import { LifeBuoy } from "lucide-react";
import { React, use, useState } from "react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp.js";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { isPending, error, signUpMutation } = useSignUp();
  const handleSignUp = (e) => {
    e.preventDefault();
    signUpMutation(signUpData);
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
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Create an Account</h2>
                <p className="text-sm ">Join us and start your journey!</p>
              </div>

              <div className="space-y-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    value={signUpData.name}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, name: e.target.value })
                    }
                    required
                  />
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    required
                  />
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    required
                  />
                  <div className="text-sm opacity-70">
                    Password must be at least 6 characters long.
                  </div>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      required
                    />
                    <span className="label-text">
                      I agree to the{" "}
                      <a href="/" className="text-primary">
                        Terms and Conditions
                      </a>
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            <div className="divider my-4">OR</div>
            <div className="space-y-4">
              <p className="text-sm ">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login
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

export default SignUpPage;
