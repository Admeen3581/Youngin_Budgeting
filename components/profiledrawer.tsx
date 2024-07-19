import React from "react"
import { Minus, Plus } from "lucide-react"
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

export function ProfilePopUp({isOpen, onClose} : PopUpProps) 
{
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
              <DrawerTitle className="text-24 text-center">Profile Settings</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    <p>Goal</p>
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Calories/day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <Button>Save</Button>
              <DrawerClose>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
    </>
  )
}


