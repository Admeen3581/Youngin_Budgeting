import React from 'react'

const Footer = ({user, type='desktop'}: FooterProps) => {
  return (
    <footer className='footer'>
        <div className={type==='desktop' ? 'footer_name' : 'footer_name-mobile'}>
            <p className='text-xl font-bold text-gray-600'>
                {user.name[0]}
            </p>
        </div>
        <div className={type==='desktop' ? 'footer_email' : 'footer_email-mobile'}>
            <h1 className='text-14 truncate font-normal text-gray-600'>
                {user.name}
            </h1>
        </div>
    </footer>
  )
}

export default Footer