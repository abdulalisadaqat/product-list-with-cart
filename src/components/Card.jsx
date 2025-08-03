import { useEffect, useState } from "react";

function Card({ product, cartItems, setCartItems }) {
	const [addedToCart, setAddedToCart] = useState(false);
	const [itemQuantity, setItemQuantity] = useState(1);

	const addToCart = () => {
		setCartItems([...cartItems, { product: product, quantity: 1 }]);
	};

	const updateCartItemQuantity = (id, quantity) => {
		setCartItems((prevItems) =>
			prevItems.map((item) =>
				item.product.id === id
					? { ...item, quantity: item.quantity + quantity }
					: item
			)
		);
	};

	useEffect(() => {
		if (cartItems.length == 0) {
			setAddedToCart(false);
			setItemQuantity(1);
		}
	}, [cartItems]);

	return (
		<>
			<div className="card">
				<div
					className={
						"card-header relative border-red-600 rounded-md " +
						(addedToCart ? "border-2" : "")
					}
				>
					<picture>
						<source media="(min-width:768px)" srcSet={product.image.desktop} />
						<source media="(min-width:650px)" srcSet={product.image.tablet} />
						<img
							src={product.image.mobile}
							alt={product.name}
							className="w-full rounded-md"
						/>
					</picture>
					<div className="absolute bottom-0 left-0 right-0 w-max overflow-hidden mx-auto translate-y-[50%] border border-red-600 rounded-full">
						{!addedToCart ? (
							<button
								className="w-full rounded-full flex justify-center gap-1 font-semibold bg-white border-none px-7 py-2 hover:text-red-600 transition-all duration-200 ease-in-out"
								onClick={() => {
									setAddedToCart(!addedToCart);
									addToCart();
								}}
							>
								<img src="images/icon-add-to-cart.svg" alt="" />
								Add to Cart
							</button>
						) : (
							<div className="count-control w-full flex gap-9 items-center justify-between bg-red-600 px-2 py-1.5">
								<button
									className={
										"bg-transparent border border-white text-white rounded-full h-5 w-5 flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-200 ease-in-out disabled:bg-gray-200 disabled:text-black"
									}
									onClick={() => {
										updateCartItemQuantity(product.id, -1);
										setItemQuantity(itemQuantity - 1);
									}}
									disabled={itemQuantity <= 1}
								>
									-
								</button>
								<span className="text-white font-semibold">{itemQuantity}</span>
								<button
									className="bg-transparent border border-white text-white rounded-full h-5 w-5 flex items-center justify-center hover:bg-white hover:text-red-600 transition-all duration-200 ease-in-out"
									onClick={() => {
										updateCartItemQuantity(product.id, 1);
										setItemQuantity(itemQuantity + 1);
									}}
								>
									+
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="card-body pt-8">
					<p className="text-rose-900">{product.category}</p>
					<h2 className="font-semibold">{product.name}</h2>
					<p className="font-semibold text-orange-700">
						${product.price.toFixed(2)}
					</p>
				</div>
			</div>
		</>
	);
}

export default Card;
