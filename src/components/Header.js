import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import {signIn,signOut,useSession } from 'next-auth/react'
import { useRouter } from "next/router";
import {selectItems} from '../slices/basketSlice'
import { useSelector } from "react-redux";

export const Header = () => {
   const {data: session} = useSession()
   const router = useRouter()
   const items = useSelector(selectItems)

   return  <header>
        {/* Top nav bar */}
        <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
            <div  className="flex items-center flex-grow sm:flex-grow-0">
                <Image
                    onClick={()=> router.push('/')}
                    src="https://links.papareact.com/f90"
                    alt=""
                    height = {35}
                    width = {140}
                    className="cursor-pointer mr-2 mt-2 ml-2"
                />
                <p className="text-white font-extrabold md:text-sm mt-2 mr-2">Clone</p>
            </div>

            {/* search bar */}
            <div className="hidden sm:flex item-center rounded-md h-10 flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500"> 
                <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                <SearchIcon className="h-12 p-4"/>
            </div>

            {/* Right */}
            <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                <div onClick={!session ? signIn : signOut} className="link">
                    <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
                    <p className="font-extrabold md:text-sm">Accounts & Lists</p>
                </div>
                <div className="link">
                    <p>Returns</p>
                    <p className="font-extrabold md:text-sm">& Orders</p>
                </div>
                <div onClick={()=> router.push('/checkout')} className="relative flex items-center link">
                    <span className="absolute top-0 rught-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">{items.length}</span>
                    <ShoppingCartIcon className="h-10"/>
                    <p className="hidden md:inline font-extrabold md:text-sm mt-2">Busket</p>
                </div>
            </div>
        </div>

        {/* botoom nav bar */}
        <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
            <p className="link flex items-center">
            <MenuIcon className="h-6 mr-1"/> 
                All
            </p>
            <p className="link">Prime video</p>
            <p className="link">Amazon Business</p>
            <p className="link">Today's deal</p>
            <p className="link hidden lg:inline-flex">Electronics</p>
            <p className="link hidden lg:inline-flex">Food and Grocery</p>
            <p className="link hidden lg:inline-flex">Prime</p>
            <p className="link hidden lg:inline-flex">Buy Again</p>
            <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
            <p className="link hidden lg:inline-flex">Health and personal care</p>
        </div>
    </header> 
}