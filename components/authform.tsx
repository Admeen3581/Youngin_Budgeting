'use client';

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import {z} from "zod" /*This is a reminder that all form events must be client side */
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import SignFormTemplate from './signform';
import {Loader2} from 'lucide-react';
import { authFormSchema } from '@/lib/utils';

const AuthForm = ({type}: {type : string}) => 
{
  //Form Definiton
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>(
  {
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [user, setUser] = useState(null); /*I have no idea what this does? */
  const [isLoading, setIsLoading] = useState(false); 
  /*Sets initial loading state to false. If any action could cause a load, switch the bool val. */
 
  // Submission handler
  function onSubmit(values: z.infer<typeof formSchema>)
  {
      setIsLoading(true);
      
      console.log(values)
      setIsLoading(false);
  }
    
  return (
      <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='cursor-pointer items-center gap-1 flex'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Youngin Logo"
                    />

                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                        Youngin
                    </h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                        ? 'Link your account!'
                        : type === 'sign-in' /*I don't quite understand this ternary logic */
                            ? "Sign In"
                            : "Sign Up" 
                        }
                    </h1>

                    <p className='text-16 font-normal text-gray-600'>
                        {user
                        ? "Link your account to get started"
                        : "Let's start by entering your details"
                        }
                    </p>
                </div>
        </header>

        {user ? (
            <div className='flex flex-col gap-4'>
                $Render a plaid link component later on$
            </div>
        ):(
            <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {type === 'sign-up' && 
                    (
                      <div className='flex flex-col gap-3'>
                        <div className='flex gap-4'>
                          {/*First name */}
                        <SignFormTemplate
                          form={form}
                          name='firstName'
                          label='First Name'
                          placeholder='ex. Jack'
                        />

                        {/*Last name */}
                        <SignFormTemplate
                          form={form}
                          name='lastName'
                          label='Last Name'
                          placeholder='ex. Hoff'
                        />
                        </div>

                        {/*Address */}
                        <SignFormTemplate
                          form={form}
                          name='address'
                          label='Home Address'
                          placeholder='ex. 123 Apple Ave.'
                        />

                        <div className='flex gap-4'>
                          {/*State*/}
                        <SignFormTemplate
                          form={form}
                          name='state'
                          label='State'
                          placeholder='ex. TX'
                        />

                        {/*Postal Code*/}
                        <SignFormTemplate
                          form={form}
                          name='code'
                          label='Postal Code'
                          placeholder='ex. 11593'
                        />
                        </div>

                        {/*Country*/}
                        <SignFormTemplate
                          form={form}
                          name='country'
                          label='Country'
                          placeholder='ex. United States of America'
                        />

                        {/*Birthday*/}
                        <SignFormTemplate
                          form={form}
                          name='birthday'
                          label='Date Of Birth'
                          placeholder='MM-DD-YYYY'
                        />

                        {/*Username/Email */}
                        <SignFormTemplate
                        form={form}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        />

                        {/*Username/Email Confirm*/}
                        <SignFormTemplate
                        form={form}
                        name="confirmEmail"
                        label="Confirm Email"
                        placeholder=""
                        />

                        {/*Password */}
                        <SignFormTemplate
                        form={form}
                        name='password'
                        label='Password'
                        placeholder='Enter your password'
                        type='password'
                        />

                        {/*Password Confirm*/}
                        <SignFormTemplate
                        form={form}
                        name='confirmPass'
                        label='Confirm Password'
                        placeholder=''
                        type='password'
                        />
                      </div>
                    )}

                    {type === 'sign-in' && 
                    (
                      <div className='flex flex-col gap-3'>
                        {/*Username/Email */}
                        <SignFormTemplate
                          form={form}
                          name="email"
                          label="Email"
                          placeholder="Enter your email"
                        />
                        {/*Password */}
                        <SignFormTemplate
                          form={form}
                          name='password'
                          label='Password'
                          placeholder='Enter your password'
                          type='password'
                        />
                      </div>
                    )}

                    
                    <div className='flex flex-col gap-4'>
                      <Button type="submit" className='form-btn' disabled={isLoading}>
                        {isLoading ? 
                        (
                          <div className='mt-6'>
                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                          </div>
                        ):(
                          type !== 'sign-in' ? 'Sign Up' : 'Sign In'
                        )}
                      </Button>
                    </div>
                  </form>

                  <footer className='flex justify-center gap-1 mt-3'>
                    <p className='text-14 font-normal text-gray-600'>
                      {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                      
                      <Link href={type === 'sign-in' ? '/sign_up' : '/sign_in'} className='form-link flex justify-center'>
                          {type === 'sign-in' ? "Sign Up!" : "Sign In!"}
                      </Link>
                    </p>
                  </footer>

                </Form>
            </div>
        )}



    </section>
  )
}

export default AuthForm