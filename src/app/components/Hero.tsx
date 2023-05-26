import React from 'react';

function Hero() {
  return (
    <section className="bg-slate-200 py-20">
      <div className="max-w-screen-xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to CA GPT</h1>
        <p className="text-lg mb-10">Unlock the power of AI with our advanced SAS product.</p>
        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="py-2 px-4 rounded-l-lg focus:outline-none"
          />
          <button className="bg-blue-600 text-white px-6 rounded-r-lg">Subscribe</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
