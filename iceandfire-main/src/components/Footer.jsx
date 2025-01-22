// import React from 'react'
// import { Link } from 'react-router-dom'

// function Footer() {
//   return (
//     <div>
//       <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
//     <div className="col-md-4 d-flex align-items-center">
//       <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
//         {/* <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
//       </Link>
//       <span className="text-muted">© 2024 New PaavBhaji, Inc</span>
//     </div>

//     <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
//       {/* <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
//       <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
//       <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li> */}
//     </ul>
//   </footer>
//     </div>
//   )
// }

// export default Footer

import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-green-500 text-white text-center py-4 mt-8">
  <p>© 2024 New Paavbhaji. All rights reserved. <br /> Bringing the taste of Mumbai streets to your plate!</p>
  <div className="flex justify-center space-x-4 mt-4">
    <a href="#" className="hover:underline">Privacy Policy</a>
    <a href="#" className="hover:underline">Terms of Service</a>
    <a href="#" className="hover:underline">Contact Us</a>
  </div>
</footer>

  )
}

export default Footer
