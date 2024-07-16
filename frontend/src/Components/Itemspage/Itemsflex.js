import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard'

function Itemsflex() {

  const [gifts, setGifts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/admin/allgifts")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {

       setGifts(data.gifts)
      })
      .catch(error => {
       console.log(error)
      });
  }, []);


  return (
    <div className='grid grid-cols-4'>
        {
          gifts.map(gift => {
            return (
              <ItemCard gift={gift} />
            )
          })
        }
        {
          gifts.map(gift => {
            return (
              console.log(gift)
            )
          })
        }
       
     
       {/* <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard />
       <ItemCard /> */}
    </div>
  )
}



export default Itemsflex