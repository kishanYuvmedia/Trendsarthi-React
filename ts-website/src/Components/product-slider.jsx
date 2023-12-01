import React from "react";
import "./style.css";
export default function ProductSlider() {
  return (
    <div>
      <div class="slider">
        <div class="row">
          <div class="col-xs-6 col-sm-3 col-md-3">
            <h4 class="imageSlid">NIFTY 50</h4>
          </div>
          <div class="col-xs-6 col-sm-3 col-md-3">
            <h4 class="imageSlid">BANK NIFTY</h4>
          </div>
          <div class="col-xs-6 col-sm-3 col-md-3">
            <h4 class="imageSlid">FINNIFTY</h4>
          </div>
          <div class="col-xs-6 col-sm-3 col-md-3">
            <h4 class="imageSlid">MIDCPNIFTY</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
