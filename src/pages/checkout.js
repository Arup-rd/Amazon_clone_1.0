import Image from 'next/image';
import { useSelector } from 'react-redux';
import { CheckoutProduct } from '../components/checkoutProduct';
import {Header} from '../components/Header'
import { selectItems, selectTotal } from '../slices/basketSlice';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const {data: session} = useSession()

    const createCheckoutSession = async () => {
        const stripe = await stripePromise

        const checkoutSession = await axios.post('./api/auth/create_checkout',{
            items: items,
            email: session.user.email
        })

          const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
          });

        if(result.error) {
            alert(result.error.message)
        }
    }

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
               <div className='flex flex-col bg-white p-10 shadow-md'>
                   {
                    items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length}) items:{" "}
                                <span className='font-bold'>
                                    <Currency quantity={total} currency='CAD'/>
                                </span>
                            </h2>
                            <button 
                                role='link'
                                onClick={createCheckoutSession}
                                disabled={!session}
                                className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {session ? 'procced to checkout' : 'sign In to checkout'}
                            </button>
                        </>
                    )
                   }
               </div>
            </main>
        </div>
    )
}

export default Checkout;