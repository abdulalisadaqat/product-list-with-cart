import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { products } from "./data";
function App() {
	const [cartItems, setCartItems] = useState([]);

	const removeFromCart = (id) => {
		setCartItems((prevItems) =>
			prevItems.filter((item) => item.product.id !== id)
		);
	};

	const confirmOrder = () => {
		document.querySelector(".modal").classList.toggle("hidden");
	};

	// Reset cart items and close the modal
	const startNewOrder = () => {
		document.querySelector(".modal").classList.toggle("hidden");
		setCartItems([]);
		window.scrollTo(0, 0);
	};

	const cartTotalPrice = cartItems.reduce((total, item) => {
		return total + item.product.price * item.quantity;
	}, 0);

	const cartTotalItems = cartItems.reduce((total, item) => {
		return total + item.quantity;
	}, 0);
	return (
		<>
			<div className="container mx-auto lg:py-16 xl:p-20 p-6">
				<div className="grid grid-cols-[2.8fr_1.2fr] max-lg:grid-cols-1 gap-8">
					{/* products list */}
					<div className="products">
						<h1 className="text-4xl font-bold mb-6">Desserts</h1>
						<div className="grid grid-cols-1  xs:grid-cols-2 md:grid-cols-3 gap-6">
							{products.map((product) => (
								<Card
									product={product}
									cartItems={cartItems}
									setCartItems={setCartItems}
									key={product.id}
								/>
							))}
						</div>
					</div>

					{/* cart section */}
					<div className="cart p-6 pb-8 bg-white rounded-lg h-max">
						<h2 className="text-2xl font-bold text-orange-700 mb-8">
							Your Cart ({cartTotalItems})
						</h2>
						{cartItems.length == 0 ? (
							// if cart is empty
							<div className="empty-state text-center">
								<img
									src="images/illustration-empty-cart.svg"
									alt="empty cart image"
									className="mx-auto mb-5"
								/>
								<p className="text-amber-800 font-medium text-sm">
									Your added items will appear here
								</p>
							</div>
						) : (
							// if cart id full
							<div className="cart-list">
								<ul>
									{cartItems.map((item) => (
										<li
											className="border-b mt-5 pb-5 flex items-center justify-between"
											key={item.product.id}
										>
											<div className="detail">
												<h3 className="font-semibold">{item.product.name}</h3>
												<div className="flex items-center gap-3 mt-2">
													<span className="text-red-600 font-semibold">
														{item.quantity}x
													</span>
													<span className="text-red-900">
														@ ${item.product.price.toFixed(2)}
													</span>
													<span className="text-red-900 font-semibold">
														$
														{(
															Number(item.product.price) * item.quantity
														).toFixed(2)}
													</span>
												</div>
											</div>
											<button
												className="border-2 border-red-900 rounded-full w-4 h-4 p-2 flex items-center justify-center text-2xl text-red-900 hover:border-black hover:text-black transition-all duration-200 ease-in-out"
												onClick={() => {
													removeFromCart(item.product.id);
												}}
											>
												&times;
											</button>
										</li>
									))}
								</ul>
								<div className="w-full flex items-center justify-between py-5">
									<p>Order Total</p>
									<span className="text-3xl font-bold">
										${cartTotalPrice.toFixed(2)}
									</span>
								</div>
								<div className="w-full flex items-center justify-center gap-2 py-5 bg-orange-50 rounded-lg">
									<img
										src="images/icon-carbon-neutral.svg"
										alt="carbon-neutral-icon"
									/>
									<p>
										This is a{" "}
										<span className="font-semibold">carbon-neutral</span>{" "}
										delivery
									</p>
								</div>
								<button
									className="w-full bg-red-600 text-white text-center font-semibold rounded-full py-4 mt-6 hover:bg-red-700 transition-all duration-200 ease-in-out"
									onClick={confirmOrder}
								>
									Confirm Order
								</button>
							</div>
						)}
					</div>
				</div>

				{/* order confirmation dialog */}
				<div className="modal fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center max-xs:items-end hidden">
					<div className="modal-dialog bg-white rounded-lg p-8 max-xs:w-full max-xs:rounded-b-none">
						<div className="modal-content">
							<div className="modal-header">
								<img
									src="images/icon-order-confirmed.svg"
									alt="icon-order-confirmed"
								/>
								<h2 className="text-4xl font-bold my-4">Order Confirmed</h2>
								<p className="text-sm text-red-950">
									We hope you enjoy your food!
								</p>
							</div>
							<div className="modal-body bg-orange-50 rounded-lg px-5 my-6">
								<ul>
									{cartItems?.map((item) => (
										<li
											className="border-b py-5 flex items-center justify-between"
											key={item.product.id}
										>
											<img
												src={item.product.image.thumbnail}
												alt={item.product.name}
												className="w-14 h-14 rounded-md object-cover mr-4"
											/>
											<div className="detail w-full text-start">
												<h3 className="font-semibold">{item.product.name}</h3>
												<div className="flex items-center gap-2">
													<span className="text-red-600 font-semibold">
														{item.quantity}x
													</span>
													<span className="text-red-950">
														@ ${item.product.price}
													</span>
												</div>
											</div>
											<p className="font-semibold ml-4">
												${(item.product.price * item.quantity).toFixed(2)}
											</p>
										</li>
									))}
								</ul>
								<div className="w-full flex items-center justify-between py-5">
									<p>Order Total</p>
									<span className="text-2xl font-bold">
										${cartTotalPrice.toFixed(2)}
									</span>
								</div>
							</div>
							<div className="modal-footer">
								<button
									className="w-full bg-red-600 text-white text-center font-semibold rounded-full py-3 hover:bg-red-700 transition-all duration-200 ease-in-out"
									onClick={() => {
										startNewOrder();
									}}
								>
									Start New Order
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
