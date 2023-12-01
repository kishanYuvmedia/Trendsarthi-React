import React from "react";

export default function Fetures() {
  return (
    <div>
      <section class="pt-8 pt-md-12 pb-2 pb-md-14 pb-lg-15">
        <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-12 col-md-6">
              <div class="img-skewed img-skewed-end mb-10 mb-md-0">
                <img
                  src="./Images/images-phone.png"
                  alt="..."
                  class="img-fluid"
                  data-aos="img-skewed-item-end"
                />
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-5">
              <h2>
                "Charting Success in Bearish Waves:
                <br />
                <span class="text-success">
                  Nifty and BankNifty Short Trading Perfected"
                </span>
              </h2>
              <p class="fs-lg text-gray-700 mb-6">
                Embark on a journey of financial mastery with our expertise in
                navigating the tumultuous waters of Nifty and BankNifty through
                short trading strategies. 'Charting Success in Bearish Waves'
                encapsulates our commitment to perfection in every move,
                offering insights and proven techniques.
              </p>
              <div class="d-flex">
                <div class="pe-5">
                  <h3 class="mb-0">
                    <span
                      data-countup='{"startVal": 0}'
                      data-to="1000"
                      data-aos
                      data-aos-id="countup:in"
                    >
                      0
                    </span>
                    +
                  </h3>
                  <p class="text-gray-700 mb-0">Components</p>
                </div>
                <div class="border-start border-gray-300"></div>
                <div class="px-5">
                  <h3 class="mb-0">
                    <span
                      data-countup='{"startVal": 0, "decimalPlaces": 2}'
                      data-to="99.99"
                      data-aos
                      data-aos-id="countup:in"
                    >
                      0.00
                    </span>
                    %
                  </h3>
                  <p class="text-gray-700 mb-0">Satisfaction</p>
                </div>
                <div class="border-start border-gray-300"></div>
                <div class="ps-5">
                  <h3 class="mb-0">
                    <span
                      data-countup='{"startVal": 0, "decimalPlaces": 1}'
                      data-to="5.0"
                      data-aos
                      data-aos-id="countup:in"
                    >
                      0.0
                    </span>
                    /5.0
                  </h3>
                  <p class="text-gray-700 mb-0">Review Score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="pt-8 pt-md-12 pb-2 pb-md-14 pb-lg-15" style={{backgroundColor:'rgb(66 186 150)'}}>
      <div class="container">
          <div class="row align-items-center justify-content-between">
            <div class="col-12 col-md-12 order-md-2" data-aos="fade-up">

                <div class="device device-macbook">
                  <img
                    src="Images/dashboard2.png"
                    class="device-screen"
                    alt="..."
                  />
                  <img
                    src="assets/img/devices/macbook.svg"
                    class="img-fluid"
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
          </section>
    </div>
  );
}
