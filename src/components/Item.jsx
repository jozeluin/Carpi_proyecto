import React from 'react'

const Item = ({producto}) => {
  return (
    <div className='producto'>
        <img src={producto.imagen}/>
        </div>
  )
}

export default Item