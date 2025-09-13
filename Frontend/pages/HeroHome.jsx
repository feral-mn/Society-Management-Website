import React from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Notices from "../components/Notices";
// import Events from "../components/Events";
// import Amenities from "../components/Amenities";
// import Committee from "../components/Committee";
import Footer from "../components/Footer";

export default function HeroHome() {
  return (
    <div className="font-poppins bg-gray-100">
      <Hero />
      <Stats />
      {/* <Notices /> */}
      {/* <Events /> */}
      {/* <Amenities />
      <Committee /> */}
      <Footer />
    </div>
  );
}
