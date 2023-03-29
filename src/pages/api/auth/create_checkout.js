const stripe = require('stripe')('sk_test_51Mo9RXJSJFTTfKcRvkuYICGgJ3O8jBrgfBlfQ2iDHTmYh0L7We0qfYy1HuamCsQBHCky7xg9tp8SUrOma9SZmAbE00oNmpvbiK');

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map(item => ({
    quantity: 1,
    price_data: {
      currency: 'cad',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images:[item.image],
        description: item.description
      }
    },
  }));

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: transformedItems,
  mode: 'payment',
  success_url: `${process.env.HOST}/success`,
  cancel_url: `${process.env.HOST}/checkout`,
  metadata: {
    email,
    images: JSON.stringify(items.map((item)=> item.image))
  }
});

res.status(200).json({ id: session.id});

}