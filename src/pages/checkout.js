import Image from 'next/image';
import { useSelector } from 'react-redux';
import { CheckoutProduct } from '../components/checkoutProduct';
import {Header} from '../components/Header'
import { selectItems } from '../slices/basketSlice';

function Checkout() {
    const items = useSelector(selectItems)
    return(
        <div>
            <Header/>
            <main className="lg:flex max-w-screen-2xl mx-auto">
               {/* leftSide */}
               <div className='flex-grow m-5 shadow-sm'>
                    <Image
                        src="https://links.papareact.com/ikj"
                        width={1020}
                        height={250}
                        alt=""
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>{items.length === 0 ? "Your Busket is Empty" : "Shopping Busket"}</h1>
                        {items.map(({id, title, description,price,category,image,hasPrime,Rating}, i)=> (
                            <CheckoutProduct
                                key={i}
                                id={id}
                                image={image}
                                description={description}
                                title={title}
                                price={price}
                                category={category}
                                hasPrime={hasPrime}
                                Rating={Rating}

                            />
                        ))}
                    </div>
               </div>

               {/* rightSide */}
               <div>HEllo</div>
            </main>
        </div>
    )
}

export default Checkout;