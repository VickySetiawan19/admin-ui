import React from "react";
import UserCard from "./UserCard";

function Exercise() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        User Cards
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <UserCard name="Lau" email="lau@skillizu.id" street="Jl. Merbabu" city="Semarang" />
        <UserCard name="Siape" email="siape@mail.com" street="Jl. Jalan" city="Surabaya" />
        <UserCard name="Mpruy" email="mpruy@mail.com" street="Jl. Ahmad Yani" city="Jakarta" />
      </div>
    </div>
  );
}

export default Exercise;