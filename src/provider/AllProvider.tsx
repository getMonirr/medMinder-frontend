"use client";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import NextAuthProvider from "./NextAuthProvider";

const AllProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextAuthProvider>
        {children}
        <ToastContainer />
      </NextAuthProvider>
    </>
  );
};

export default AllProvider;
