import React from 'react'
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


const SignFormTemplate = ({form, name, label, placeholder, type=''}) => {
  return (
    <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <div className='form-item'>
              <FormLabel className='form-label'>
                  {label}
              </FormLabel>
              <div className='flex w-full flex-col'>
                  <FormControl>
                      <Input
                          placeholder={placeholder}
                          className='input-class'
                          type={type}
                          {...field}
                      />
                  </FormControl>
                  <FormMessage className='form-message mt-2'></FormMessage>
              </div>
          </div>
        )}
    />
  )
}

export default SignFormTemplate