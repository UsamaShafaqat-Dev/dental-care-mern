import React from "react";

const About = () => {
  return (
    <div className="py-24 px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-black text-blue-950 mb-8 tracking-tighter">
          About Our Clinic
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-12 font-medium">
          Dr. Umair Rafique Dental Clinic is dedicated to providing the highest
          quality dental care in a comfortable and friendly environment. With
          years of experience and modern technology, we ensure that every
          patient gets the best treatment.
        </p>
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000"
          className="rounded-[50px] shadow-2xl border-[15px] border-blue-50"
          alt="Clinic"
        />
      </div>
    </div>
  );
};

export default About;
