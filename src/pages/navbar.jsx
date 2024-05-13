import React from 'react';
import { Link } from 'react-router-dom';




import Thegirl_icon from '../pictures/The girl.jpg';
import Thegirl1_icon from '../pictures/The girl1.jpg';

function Navbar() {
  return (
    <React.Fragment>
      <nav className="classic-navbar">
        <div className="container-fluid">
          <a className="navbar-brand fs-1" href="/">The Sports Blog</a>
          <div className="navbar-links">
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/posts">Add Post</Link>
              </li>
              <li>
                <Link to="/">Log out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" style={{ position: 'relative' }}>
          <img src={Thegirl_icon} className="d-block w-100 " alt=" Slide 1" />
            <div className="carousel-caption">
              <p className='fs-1'>A Beautiful Sportswoman</p>
            </div>
        </div>
          <div className="carousel-item" style={{ position: 'relative' }}>
           <img src={Thegirl1_icon} className="d-block w-100" alt=" Slide 2" />
            <div className="carousel-caption">
               <p className=" fs-1">The Sport is Power and Action</p>
            </div>
          </div>
         </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden ">Next</span>
        </button>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
