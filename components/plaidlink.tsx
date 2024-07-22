import React, { useCallback, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { redirect } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/userActions';
import { useRouter } from 'next/router';

const PlaidLink = ({user, variant}: PlaidLinkProps) => {

    const [token, setToken] = useState('');

    useEffect(() => 
    {
        const getLinkToken = async () =>
        {//server action
            const data = await createLinkToken(user);

            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user])

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => 
    {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })

        useRouter().push('./');
    }, [user])

    const config: PlaidLinkOptions = {
        token, onSuccess
    }

    const {open, ready} = usePlaidLink(config);

    return (
        <>
            {variant === 'primary' ?
            (
                <Button onClick={() => open()} className='plaidlink-primary' disabled={!ready}>
                    Connect bank
                </Button>
            ):(
                variant === 'ghost' ?
                (
                    <Button onClick={() => open()} className='plaidlink-ghost' variant='ghost'>
                        Connect bank
                    </Button>
                ):
                (
                    <Button onClick={() => open()} className='plaidlink-default'>
                        Connect bank
                    </Button>
                )
            )
            }
        </>
    )
}

export default PlaidLink