import React from 'react'
import BASE_URL from '../hooks/baseURL'
import useFetch from '../hooks/useFetch'

const Promotion = () => {
  const {data: promotions} = useFetch(BASE_URL + '/promotion');
  return (
      <div className='py-4 px-3 px-sm-5 mx-lg-5 mb-5'>
        <h1 className="fw-bold text-center">Promotion</h1>
        {promotions && promotions.map((promo,index)=>{
          return  <img key={index} src={promo.img_url} className='my-3 my-sm-4 promotionImg' />
        })}
     </div>
  )
}

export default Promotion
