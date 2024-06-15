import React from 'react';

const cartItems = [
  {
    id: 1,
    name: 'Basic Tee',
    color: 'Sienna',
    size: 'Large',
    price: 32.0,
    imageSrc: 'https://via.placeholder.com/150', // Replace with actual image URL
    inStock: true,
  },
  {
    id: 2,
    name: 'Basic Tee',
    color: 'Black',
    size: 'Large',
    price: 32.0,
    imageSrc: 'https://via.placeholder.com/150', // Replace with actual image URL
    inStock: false,
    estimatedShipping: 'Ships in 3-4 weeks',
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    color: 'White',
    size: 'Large',
    price: 35.0,
    imageSrc: 'https://via.placeholder.com/150', // Replace with actual image URL
    inStock: true,
  },
];

const ShoppingCart = () => {
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const shippingEstimate = 5.0;
  const taxEstimate = 8.32;
  const orderTotal = subtotal + shippingEstimate + taxEstimate;

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-6 border-b">
                <div className="flex items-center">
                  <img src={item.imageSrc} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.color}</p>
                    <p className="text-sm text-gray-600">{item.size}</p>
                    <p className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</p>
                    {item.inStock ? (
                      <p className="text-sm text-green-500 mt-2">In stock</p>
                    ) : (
                      <p className="text-sm text-gray-500 mt-2">{item.estimatedShipping}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <select className="border rounded-md p-1">
                    {[1, 2, 3, 4, 5].map((quantity) => (
                      <option key={quantity} value={quantity}>
                        {quantity}
                      </option>
                    ))}
                  </select>
                  <button className="ml-4 text-gray-500 hover:text-red-500">&times;</button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order summary</h2>
            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <p>
                Shipping estimate
                <span className="ml-1 text-gray-400 cursor-pointer">?</span>
              </p>
              <p>${shippingEstimate.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <p>
                Tax estimate
                <span className="ml-1 text-gray-400 cursor-pointer">?</span>
              </p>
              <p>${taxEstimate.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-900 font-bold text-xl mt-4">
              <p>Order total</p>
              <p>${orderTotal.toFixed(2)}</p>
            </div>
            <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
