import React from 'react'
import { ShieldAlert } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'

const AlertPopUp = ({title, desc, onClose}: AlertProps) => 
{
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 p-7 rounded shadow-lg w-5/12 mb-30 text-center">
        <Alert variant={'destructive'}>
          <ShieldAlert className="h-10 w-10 mx-auto" />
          <AlertTitle className='mx-10 text-lg'>{title}</AlertTitle>
          <AlertDescription className='mx-10'>{desc}</AlertDescription>
          <div className='mt-10 text-center'>
            <Button onClick={onClose} className="mt-8 bg-red-1 bg-opacity-60 font-bold">Okay</Button>
          </div>
        </Alert>
      </div>
    </div>
  )
}

export default AlertPopUp