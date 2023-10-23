import Link from "next/link";
import React from "react";
import RootLayout from "./shared/RootLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-pill-bg text-white">
      <RootLayout>
        <div className="navbar bg-pill-bg text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/reminder">Set Reminder</Link>
                </li>
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl">MedMinder</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/reminder">Set Reminder</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {session ? (
              <>
                <Link href="/api/auth/signout" className="btn mr-4">
                  SingOut
                </Link>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      width={100}
                      height={100}
                      src={session?.user?.image!}
                      alt="image"
                    />
                  </div>
                </label>
              </>
            ) : (
              <Link href="/api/auth/signin" className="btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </RootLayout>
    </div>
  );
};

export default Navbar;
