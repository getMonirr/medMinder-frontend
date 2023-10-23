import React from "react";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import Link from "next/link";

const Banner = () => {
  return (
    <div
      className="hero min-h-[calc(100vh-67px)]"
      style={{
        backgroundImage: `url(${banner2.src})`,
        backgroundPosition: "bottom right",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold capitalize">
            Welcome MedMinder app
          </h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href="/reminder">
            <button className="btn btn-primary bg-pill-bg border-none">
              Create reminder
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
