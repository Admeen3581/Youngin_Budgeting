import React, { useState } from 'react'
import { ProfilePopUp } from './profiledrawer';

const Footer = ({user, type='desktop'}: FooterProps) => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    return (
        <>
            <div hidden={drawerOpen}>
                <footer className='footer' onClick={openDrawer}>
                    <div className={type === 'desktop' ? 'footer_name' : 'footer_name-mobile'}>
                        <p className='text-xl font-bold text-gray-600'>
                            {user.firstName[0]}
                        </p>
                    </div>
                    <div className={type === 'desktop' ? 'footer_email' : 'footer_email-mobile'}>
                        <h1 className='text-16 truncate font-normal text-gray-600'>
                            {`${user.firstName} ${user.lastName}`}
                        </h1>
                    </div>
                </footer>
            </div>
            <div hidden={!drawerOpen}>
                <ProfilePopUp isOpen={drawerOpen} onClose={closeDrawer}/>
            </div>
        </>
    )
}

export default Footer