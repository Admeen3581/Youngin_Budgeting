import React, { useEffect, useState } from 'react'

const WaitPage = (isSigningIn: boolean) => 
{
    const [show, setShow] = useState(true)

    // On componentDidMount set the timer
    useEffect(() => {
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setShow(false)
      }, 3000)
    
      return () => {
        clearTimeout(timeId)
      }
    }, []);


    return (
        <div>
            <h1 className='flex-col flex text-26 mx-auto'>
                Loading here....
            </h1>
        </div>
    )
  
    
}

export default WaitPage