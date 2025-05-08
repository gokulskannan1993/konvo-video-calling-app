import React from "react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { Bell, LifeBuoy, LogOut } from "lucide-react";
import useLogout from "../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { authUser } = useAuthUser();

  const location = useLocation();

  const isChatPage = location.pathname?.startsWith("/chat");

  const logoutMutation = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto sm:px-6 lg:px-8 px-4">
        <div className="flex items-center justify-end w-full">
          {/* LOGO only in the chat page */}
          {isChatPage && (
            <div className="pl-5">
              <Link className="flex items-center gap-2.5" to="/">
                <LifeBuoy className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                  Konvo
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <Bell className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>
          {/* Theme switcher */}
          <div>
            <ThemeSelector />
          </div>

          {/* User Profile */}
          <div className="avatar">
            <div className="rounded-full w-9">
              <img
                src={authUser?.profilePicture}
                alt="User Avatar"
                rel="noreferrer"
              />
            </div>
          </div>

          {/* Logout button */}

          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOut className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
