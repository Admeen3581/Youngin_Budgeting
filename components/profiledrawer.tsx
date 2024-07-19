import React, { useState } from "react"
import { Loader2, LogOutIcon, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { logOutUser } from "@/lib/actions/userActions"
import { useRouter } from "next/router"

export function ProfilePopUp({isOpen, onClose} : PopUpProps) 
{
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () =>
  {
    setIsLoading(true);
    const loggedOut = await logOutUser();

    if(loggedOut)
    {
      useRouter().push('./sign-in');
    }
    setIsLoading(false);
  }


  return (
    <>
     {isOpen && <div className="fixed z-30 inset-0 h-full w-full backdrop-brightness-50 backdrop-blur-sm" onClick={onClose}></div>}

    <div>
      <Drawer
        open={isOpen}
        onClose={onClose}
      >
        <DrawerContent className="fixed bg-blue-600 w-5/12 mx-auto">
          <div className="mx-6 bg-white">
            <DrawerHeader>
              <DrawerTitle className="text-26 text-center">Profile Settings</DrawerTitle>
              <DrawerDescription className="text-22 text-center">Control your account</DrawerDescription>
            </DrawerHeader>

            <hr className="bg-black"/>

            <div className="flex flex-col mx-auto text-center w-6/12 pt-4">
              <Button
                variant='expandIcon'
                Icon={LogOutIcon}
                iconPlacement="left"
                className="h-10 w-50 shrink-0 rounded-[10px] outline outline-1"
                onClick={handleLogout}
              >
                {isLoading ?
                  (
                    <div>
                      <Loader2 size={20} className="animate-spin"/>
                    </div>
                  ):(
                    <h1 className="text-bold text-20">LogOut</h1>
                  )
                }
              </Button>
            </div>





            
            <DrawerFooter>
              <DrawerClose className="pt-5 flex mx-auto">
                <div className="px-3">
                  <Button variant='outline'  className='outline outline-2' onClick={onClose}>Save</Button>
                </div>
                <div className="px-3">
                  <Button variant="outline" className="outline outline-2" onClick={onClose}>Cancel</Button>
                </div>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
    </>
  )
}


