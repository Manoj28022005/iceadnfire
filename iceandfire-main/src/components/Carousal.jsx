import React from 'react';
import '../Carousal.css'

function Carousal({setSearch}) {
  const handleInputChange=(e)=>{
    setSearch(e.target.value);
  };

  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex" onSubmit={(e)=> e.preventDefault()}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleInputChange}/>
              <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src="/pavbhaji-1.webp"
              className="d-block w-100"
              alt="..."
              style={{ objectFit: "cover", height: "500px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/misalpav.webp"
              className="d-block w-100"
              alt="..."
              style={{ objectFit: "cover", height: "500px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/vadapav.webp"
              className="d-block w-100"
              alt="..."
              style={{ objectFit: "cover", height: "500px" }}
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousal;
