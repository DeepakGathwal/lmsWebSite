import React from 'react';
import Loader from '../public/assets/images/shapes/loader-gif.gif';
import Image from 'next/image';

export default function Loading() {
  return (
    <div>
      <div className='route-loader'><Image src={Loader} alt='loader' width={500} /></div>
    </div>
  )
}
