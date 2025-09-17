// import { Signup as SignupComponent } from '../components'

// function Signup() {
//   return (
//     <div className='py-8'>
//         <SignupComponent />
//     </div>
//   )
// }

// export default Signup


import React from "react";
import { Container, Signup as SignupComponent } from "../components";

function Signup() {
  return (
    <div className="py-8">
      <Container>
        <SignupComponent />
      </Container>
    </div>
  );
}

export default Signup;
