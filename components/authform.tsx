'use client';

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import { z } from "zod" /*This is a reminder that all form events must be client side */
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
const formSchema = z.object({
  email: z.string().email( 
    {
        message: "Not a valid email"
    }
  ),
  password: z.string().min(10,
    {
        message: "Password must be longer than 10 characters"
    }
  ).regex(passwordPattern,
    {
        message: "Password must include at least 1 number & special character"
    }
  )
})


const AuthForm = ({type}: {type : string}) => {

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
})
 
  // 2. Define a submit handler.
function onSubmit(values: z.infer<typeof formSchema>)
{
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
}

    const [user, setUser] = useState(null); /*I have no idea what this does? */
    
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
                    {/*Username/Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <div className='form-item'>
                            <FormLabel className='form-label'>
                                Email
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                                <FormControl>
                                    <Input
                                        placeholder='Enter your email'
                                        className='input-class'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='form-message mt-2'></FormMessage>
                            </div>
                        </div>
                      )}
                    />
                    {/*Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <div className='form-item'>
                            <FormLabel className='form-label'>
                                Password
                            </FormLabel>
                            <div className='flex w-full flex-col'>
                                <FormControl>
                                    <Input
                                        placeholder='Enter your password'
                                        className='input-class'
                                        type='password'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='form-message mt-2'></FormMessage>
                            </div>
                        </div>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
            </div>
        )}



    </section>
  )
}

export default AuthForm