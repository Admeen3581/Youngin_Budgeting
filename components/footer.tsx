import React from 'react'

const Footer = ({user, type='desktop'}: FooterProps) => {
  return (
    <footer className='footer'>
        <div className={type==='desktop' ? 'footer_name' : 'footer_name-mobile'}>
            <p className='text-xl font-bold font-gray-700'>
                {user.firstName[0]}
            </p>
        </div>
        <div className={type==='desktop' ? 'footer_email' : 'footer_email-mobile'}>
            <h1 className='text-14 truncate font-normal text-gray-600'>
                {user.firstName}
            </h1>
        </div>
    </footer>
  )
}

export default Footer