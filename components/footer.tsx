import React, { useState } from 'react'
import { Button } from './ui/button'
import { ProfilePopUp } from './profiledrawer';

const Footer = ({user, type='desktop'}: FooterProps) => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    return (
        <>
            <Button
                onClick={openDrawer}
                hidden={type !== 'desktop'}
            >
                <footer className='footer'>
                    <div className={type === 'desktop' ? 'footer_name' : 'footer_name-mobile'}>
                        <p className='text-xl font-bold text-gray-600'>
                            {user.name[0]}
                        </p>
                    </div>
                    <div className={type === 'desktop' ? 'footer_email' : 'footer_email-mobile'}>
                        <h1 className='text-14 truncate font-normal text-gray-600'>
                            {user.name}
                        </h1>
                    </div>
                </footer>
            </Button>
            <div hidden={!drawerOpen}>
                <ProfilePopUp isOpen={drawerOpen} onClose={closeDrawer}/>
            </div>
        </>
    )
}

export default Footer