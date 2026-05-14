import React from "react";

const CareProcess = () => {
  return (
    <div className="py-24 bg-blue-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-5xl font-black text-blue-950 mb-16 tracking-tighter">
          Our Care Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              num: "01",
              title: "Consultation",
              desc: "Understand your dental health with a detailed examination.",
            },
            {
              num: "02",
              title: "Diagnosis",
              desc: "We provide clear treatment options and outcomes.",
            },
            {
              num: "03",
              title: "Treatment",
              desc: "Expert care using hygienic and painless methods.",
            },
            {
              num: "04",
              title: "Follow-Up",
              desc: "Guidance for long-term oral hygiene and health.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-10 rounded-[45px] shadow-sm border border-blue-100 text-left"
            >
              <span className="bg-blue-600 text-white px-4 py-2 rounded-2xl font-black mb-8 inline-block">
                {step.num}
              </span>
              <h4 className="text-2xl font-black text-blue-950 mb-4">
                {step.title}
              </h4>
              <p className="text-gray-500 font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareProcess;
