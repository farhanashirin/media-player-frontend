import React from 'react'
import {
  MDBFooter,
  MDBContainer,

} from 'mdb-react-ui-kit';

function Footer() {
  return (
    <>
        <MDBFooter className='bg-light text-center text-white fixed-bottom'>
    <MDBContainer className='p-4 pb-0'>
    
    </MDBContainer>

    <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      © 2020 Copyright:
      <a className='text-white' href='https://Media Player.com/'>
        Media Player.com
      </a>
    </div>
  </MDBFooter>
    </>
  )
}

export default Footer
