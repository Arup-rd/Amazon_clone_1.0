import { StarIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Currency from 'react-currency-formatter';
import { lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5
const MIN_RATING = 1

export function Product({id, title, description,price,category,image}){

    const [Rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    )

    const dispatch = useDispatch()

    const [hasPrime] = useState(Math.random() < 0.5)

    const addItemToBusket = () => {
        const product = {id, title, description,price,category,image,hasPrime,Rating}

        dispatch(addToBasket(product))
    }

    return (<div className="relative flex flex-col m-5 bg-white z-30 p-10">
                <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
                <Image 
                    alt=""
                    src={image}
                    height={200}
                    width={200}
                    className="m-auto"
                />
                <h4 className="my-3">{title}</h4>
                <div className="flex">
                    { Array(Rating)
                        .fill()
                        .map((_,i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500"/>
                    ))
                    }
                </div>
                <p className="text-xs my-2 line-clamp-2">{description}</p>
                <div className="mb-5">
                    <Currency quantity={price} currency="CAD"/>
                </div>
                { hasPrime && (
                    <div className="flex items-center space-x-2 -mt-5">
                        <img className="w-12" src="https://links.papareact.com/fdw" alt=""/>
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>     
                    </div>
                )}
                <button onClick={addItemToBusket} className="mt-auto button">Add to Busket</button>
            </div>)
}