import React from 'react'
import ProductSlider from "../Components/product-slider";
import Fetures from "../Components/fetures";
export default function About() {
  return (
    <div>
      <section class="py-10 py-md-14 overlay overlay-black overlay-60 bg-cover bannerBg" >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 text-center">
            <h1 class="display-2 fw-bold text-white">
             Abouts
            </h1>
            <p class="lead text-white text-opacity-75 mb-0">
            It's possible that Trendsarthi is a new product or development in the financial industry that emerged after my last update.
            </p>
          </div>
        </div>
      </div>
    </section>
      <Fetures/>
    </div>
  )
}
