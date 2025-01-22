import React from "react";

function MisalPav() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "400px" }}
        >
          <img src="/misalpav.jpg" className="card-img-top" alt="..." style={{ height: "200px", width: "100%", objectFit: "cover" }} />
          <div className="card-body">
            <h5 className="card-title">Misal-Pav</h5>
            <p className="card-text">Nagpur style misal with tadka and delicious taste</p>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success">
                {Array.from(Array(10), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              {/* <select className="m-2 h-100 bg-success rounded">
                <option value="half">Half</option>
                <option value="full">Full</option>
              </select> */}

              <div className="d-inline h-100 fs-5"><b>Total :100</b></div>
            </div>
            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MisalPav;
