import React from "react";
import Slider from "../Components/slider";
import ProductSlider from "../Components/product-slider";
import Fetures from "../Components/fetures";
import Pricing from "../Components/pricing";
export default function Home() {
  return (
    <div>
      <Slider />
      <ProductSlider/>
      <Fetures/>
      <Pricing/>
    </div>
  );
}
