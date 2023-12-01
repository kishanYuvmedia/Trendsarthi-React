import React from 'react'
import Pricing from "../Components/pricing";
export default function Plan() {
  return (
    <div>
        <section class="py-10 py-md-14 overlay overlay-black overlay-60 bg-cover bannerBg" >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8 text-center">
            <h1 class="display-2 fw-bold text-white">
             Plans
            </h1>
          </div>
        </div>
      </div>
    </section>
       <Pricing/>
    </div>
  )
}
