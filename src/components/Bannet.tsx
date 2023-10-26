import React from "react";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import MadhuPanchamrut from "@/assets/Madhu-Panchamrut.jpg";
import Link from "next/link";

const Banner = () => {
  return (
    <div
      className="hero min-h-[calc(100vh-67px)]"
      style={{
        backgroundImage: `url(${MadhuPanchamrut.src})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold capitalize">
            Welcome MedMinder app
          </h1>
          <p className="mb-5">
            “If one were to look well enough, we could find solutions to all our
            problems in the texts left behind by our ancestors,”
            <span className="bg-text-color text-white p-1 rounded-lg font-bold italic">
              adds Mr. Gupta
            </span>
          </p>
          <Link href="/reminder">
            <button className="btn btn-primary bg-text-color hover:bg-teal-700 border-none">
              Elixir of Life
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
