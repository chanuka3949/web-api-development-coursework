import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";

class Slider extends Component {
  state = {};

  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
           // src="https://article.images.consumerreports.org/f_auto/prod/content/dam/CRO%20Images%202019/Magazine/02February/CR-Magazine-Inlinehero-smart-phones-February-2019-1218"
           src=" https://pic.made-in-china.com/62f55j00FEtTvtaWjQlk/Mobile-Phone-Accessories.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
           // src="https://cdn.mos.cms.futurecdn.net/R4JUHrXr8HnCvFKLsxhe5h.jpg"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/M51/GW_3rdsep/Rv3_GW/P38983965_IN_WLME_SamsungGalaxy_M51_New_Launch_Mob_Hero_1242x450._CB406662233_SY250_.jpg"
           
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/Family/GalaxyMass_MFamily/V207511715_IN_WL_SamsungM_M11_M01_Launch_M_Series_Mob_Hero_1242x450._CB404780252_SY250_.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default Slider;
