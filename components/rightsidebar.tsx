import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'
import AccountCard from './accountcard'

const RightSideBar = ({user, transactions, banks}: RightSidebarProps) => {

    const namesList = user.name.split(' ');

  return (
    <aside className='right-sidebar -z-10'>
        <section className='flex flex-col pd-8'>
            <div className='profile-banner'/>
            <div className='profile'>
                 <div className='profile-img'>
                    <span className='text-5xl font-bold text-blue500'>
                        {namesList[0][0]}
                    </span>
                 </div>
                 <div className='profile-details'>
                    <h1 className='profile-name'>
                        {user.name}
                    </h1>
                    <p className='profile-email'>
                        {user.email}
                    </p>
                 </div>
            </div>
        </section>

        <section className='banks'>
            <div className='flex w-full justify-between'>
                <h2 className='header-2'>
                    My Accounts
                </h2>
                <Link
                    href="/"
                    className='flex gap-2'
                >
                    <Image
                        src="/icons/plus.svg"
                        width={20}
                        height={20}
                        alt="Plus icon"
                    />

                    <h2 className='text-14 font-semibold text-gray-600'>
                        Add Account
                    </h2>
                </Link>
            </div>

            {banks?.length > 0 &&(
                <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
                    <div className='relative z-10'>
                        <AccountCard
                            key={banks[0].$id}
                            account={banks[0]}
                            userName={user.name}
                            showBalance={false}
                        />
                    </div>
                    {banks[1] && (
                        <div className='absolute right-0 top-8 z-0 w-[90%]'>
                            <AccountCard
                            key={banks[1].$id}
                            account={banks[1]}
                            userName={user.name}
                            showBalance={false}
                        />
                        </div>
                    )}
                </div>
            )}

        </section>
    </aside>
  )
}

export default RightSideBar