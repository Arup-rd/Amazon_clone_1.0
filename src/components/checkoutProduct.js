import { StarIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToBasket,removeFromBasket } from "../slices/basketSlice";

export const CheckoutProduct = ({id, title, description,price,category,image,hasPrime,Rating}) => {
    
    const dispatch = useDispatch()

    const addItemToBusket = () => {
        const product = {id, title, description,price,category,image,hasPrime,Rating}

        dispatch(addToBasket(product))
    }

    const removeItemFromBusket = () => {
        dispatch(removeFromBasket({id}))
    }
     
    return (
        <div className="grid grid-cols-5">
            <Image 
                src={image}
                width={200}
                height={200}
                alt=""
            />
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {
                        Array(Rating)
                        .fill()
                        .map((_,i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500"/>
                    ))
                    }
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} currency="CAD"/>
                { hasPrime && (
                        <div className="flex items-center space-x-2">
                            <img className="w-12" src="https://links.papareact.com/fdw" alt=""/>
                            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>     
                        </div>
                    )}
            </div>

            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button onClick={addItemToBusket} className="button">Add to Busket</button>
                <button onClick={removeItemFromBusket} className="button">Remove from Busket</button>
            </div>
        </div>
)}