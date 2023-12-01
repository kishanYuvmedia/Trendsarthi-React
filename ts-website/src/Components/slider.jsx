import React from "react";
function Slider() {
  return (
    <div>
      <section class="position-relative py-8 py-md-11 mb-9 mt-6">
        <div class="shape shape-fluid-x shape-blur-1 text-gray-200">
          <svg
            viewBox="0 0 723 569"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M703.969 241.602l-.006-.003C716.081 262.97 723 287.677 723 314c0 68.917-47.425 126.757-111.42 142.665L246.7 556.937C226.465 564.729 204.481 569 181.5 569 81.26 569 0 487.74 0 387.5c0-34.256 9.49-66.296 25.985-93.633l-.016.008L141.512 77.548C162.753 33.305 207.123 2.273 258.951.12l.008-.12h251.04l.003.01c41.848.557 78.081 24.378 96.356 59.12l.001-.005 97.61 182.477z"
              fill="currentColor"
            />
          </svg>{" "}
        </div>
        <div class="container mt-6">
          <div class="row align-items-center">
            <div class="col-12 col-md-6 order-md-2">
              <div class="img-skewed img-skewed-start mb-8 mb-md-0">
                <img
                  src="./Images/dashboard.png"
                  alt="..."
                  class="screenshot img-fluid mw-md-130"
                  data-aos="img-skewed-item-start"
                  data-aos-delay="100"
                />
              </div>
            </div>
            <div class="col-12 col-md-6 order-md-1" data-aos="fade-up">
              <h1 class="display-3 text-danger">
              Navigate the Markets with Precision: <br />
                <span class="text-success">Nifty and BankNifty Short Trading Strategies</span>.
              </h1>

              <p class="lead text-body-secondary mb-6 mb-md-8">
              Uncover the art of short trading in Nifty and BankNifty with our expert guidance. Seize opportunities in market downturns, strategically managing risks and maximizing gains.
              </p>

              <a href="http://user.trendsarthi.com/" class="btn btn-success me-1 lift">
                Start Now <i class="fe fe-arrow-right ms-3"></i>
              </a>
              <a href="/about" class="btn btn-success-subtle lift">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Slider;
