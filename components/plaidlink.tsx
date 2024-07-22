import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { redirect } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/userActions';

const PlaidLink = ({user, variant}: PlaidLinkProps) => {

    const [token, setToken] = useState('');

    useEffect(() => 
    {
        const getLinkToken = async () =>
        {//server action
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => 
    {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })

        redirect('/');
    }, [user])

    const config: PlaidLinkOptions = {
        token, onSuccess
    }

    const {open, ready} = usePlaidLink(config);

    return (
        <>
            {variant === 'primary' ?
            (
                <Button className='plaidlink-primary' onClick={() => open} disabled={!ready}>
                    Connect bank
                </Button>
            ):(
                variant === 'ghost' ?
                (
                    <Button>
                        Connect bank
                    </Button>
                ):
                (
                    <Button>
                        Connect bank
                    </Button>
                )
            )
            }
        </>
    )
}

export default PlaidLink