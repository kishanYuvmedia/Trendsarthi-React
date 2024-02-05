import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"
import background from "../../assets/image/influencer-marketing-job-concept.jpg"
import imageLogin from "../../assets/image/png-login.png"

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9}>
        <div className="pt-lg-5 p-4">
          <div className="w-100">
            <div
              className="bg-overlay"
              style={{
                backgroundSize: "cover",
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="d-flex h-100 flex-column">
              <div className="p-4 mt-5">
                <div className="row justify-content-center">
                  {/* <div className="col-lg-7 mt-5">
                    <h1
                      style={{
                        textAlign: "center",
                        fontSize: 40,
                        color: "#36e136",
                      }}
                    >
                      Become a Savvy Scalper
                    </h1>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: 30,
                        color: "#fb3e3e",
                      }}
                    >
                      Mastering Short-Term Trading Strategies
                    </p>
                    <img
                      src={imageLogin}
                      alt=""
                      height="500"
                      style={{
                        margin: "0 auto",
                        borderRadius: 20,
                      }}
                      className="logo-dark-element"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
