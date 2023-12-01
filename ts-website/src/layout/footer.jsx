import React from 'react'
function Footer() {
  return (
    <div>
        <footer class="py-8 py-md-11" style={{backgroundColor:'rgb(16, 55, 0)'}}>
        <div class="container d-flex justify-content-center">
          <div class="row">
            <div class="col-md-12">
              <img
                src="scalping-logo.png"
                alt="..."
                class="footer-brand img-fluid mb-2"
              />
            </div>
            
          </div>
        </div>
      </footer>
      <div className='row' style={{backgroundColor:'#000'}}>
            <div class="col-md-6">
            
            </div>
            <div class="col-md-6">
              <ul className='breadcrumb breadcrumb-scroll float-end me-4'>
                <li className='breadcrumb-item'><a href='/terms-and-conditions' className='text-white'>Terms And Conditions</a></li>
                <li className='breadcrumb-item'><a href='/privacy-policy' className='text-white'>Privacy Policy</a></li>
              </ul>
            </div>
              </div>
    </div>
  )
}
export default Footer
