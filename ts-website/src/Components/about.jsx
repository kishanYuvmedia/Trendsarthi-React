import React from "react";

export default function About() {
  return (
    <div>
      <section class="about about--style1 ">
        <div class="container">
          <div class="about__wrapper">
            <div class="row gx-5  gy-4 gy-sm-0  align-items-center">
              <div class="col-lg-6">
                <div
                  class="about__thumb pe-lg-5"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  <div class="about__thumb-inner">
                    <div class="about__thumb-image floating-content">
                      <img src="assets/images/about/1.png" alt="about-image" />
                      <div
                        class="floating-content__top-left"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                      >
                        <div class="floating-content__item">
                          <h3>
                            {" "}
                            <span
                              class="purecounter"
                              data-purecounter-start="0"
                              data-purecounter-end="10"
                            >
                              30
                            </span>
                            Years
                          </h3>
                          <p>Consulting Experience</p>
                        </div>
                      </div>
                      <div
                        class="floating-content__bottom-right"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                      >
                        <div class="floating-content__item">
                          <h3>
                            {" "}
                            <span
                              class="purecounter"
                              data-purecounter-start="0"
                              data-purecounter-end="25"
                            >
                              25K
                            </span>
                            K+
                          </h3>
                          <p>Satisfied Customers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div
                  class="about__content"
                  data-aos="fade-left"
                  data-aos-duration="800"
                >
                  <div class="about__content-inner">
                    <h2>
                      Meet <span>our company</span> unless miss the opportunity{" "}
                    </h2>

                    <p class="mb-0">
                      Hey there! So glad you stopped by to Meet Our Company.
                      Don't miss out on this opportunity to learn about what we
                      do and the amazing team that makes it all happen! Our
                      company is all about creating innovative solutions and
                      providing top-notch services to our clients. From start to
                      finish, we're dedicated to delivering results that exceed
                      expectations.{" "}
                    </p>
                    <a
                      href="about.html"
                      class="trk-btn trk-btn--border trk-btn--primary"
                    >
                      Explore More{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
