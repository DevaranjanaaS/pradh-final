import React from "react";

function AboutUs() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center">About Us</h1>
      <p className="text-lg mb-8 text-center max-w-2xl mx-auto">
        Welcome to Pradhikshaa Silks! We are passionate about bringing you the
        finest silk products with a blend of tradition and modernity. Our team is
        dedicated to quality, customer satisfaction, and unique designs. Thank you
        for choosing us!
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <img
          src="https://via.placeholder.com/300x200?text=Our+Team"
          alt="Our Team"
          className="rounded-lg shadow-md"
        />
        <img
          src="https://via.placeholder.com/300x200?text=Our+Store"
          alt="Our Store"
          className="rounded-lg shadow-md"
        />
        <img
          src="https://via.placeholder.com/300x200?text=Our+Products"
          alt="Our Products"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}

export default AboutUs;
