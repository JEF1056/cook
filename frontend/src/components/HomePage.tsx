import { useState, useEffect } from "react";
import axios from "axios";
import foodService from "../services/food";

const username: string = "Zack";

const WelcomeBanner = ({ name }: { name: string }) => {
  return <h1>Welcome back, {name}</h1>;
};

const inputFood = () => {};

export function HomePage() {
  return (
    <div>
      <WelcomeBanner name={username} />
      <p>Wow</p>
    </div>
  );
}
