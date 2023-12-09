import React, { useEffect, useState } from "react"
import "./pricing.css"
import { getPlan } from "services/api/api-service"
import { useParams,Link } from "react-router-dom"
export default function SubscribePlan() {
  let { username } = useParams()
  const [priceList, setPriceList] = useState([])
  useEffect(() => { 
    getPlan().then(result => {
      setPriceList(result)
    })
  },[])
  return (
    <div>
      <section>
        <div class="container-fluid">
          <div class="container">
            <div className="row justify-content-md-center">
              <div className="col-md-12 text-center mb-5">
                <h1>Pricing</h1>
                <p>Subscribe for Success:Navigate Market Prices with Confidence</p>
                <hr style={{color:'white'}}></hr>
              </div>
            </div>
            <div class="row justify-content-md-center">
              {priceList.map(list => (
                <div class="col-sm-4">
                  <div class="card cardView text-center">
                    <div class="title">
                      <i class="fa fa-chart-line" aria-hidden="true"></i>
                      <h2>{list.planName}</h2>
                    </div>
                    <div class="price">
                      <h4>
                      {list.pricing}<sup style={{fontSize:11}}>{list.durationValue}{" "}{list.Duration}</sup>
                      </h4>
                    </div>
                    <div class="option">
                      <ul>
                        {list?.fetures.map(item => 
                          <li>
                            {" "}
                            <i class="fa fa-check" aria-hidden="true"></i>
                            {item.label}{" "}
                          </li>
                        )}
                      </ul>
                    </div>
                    <Link to={`/plan-view/${username}/${list.id}`}>Buy Now</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
