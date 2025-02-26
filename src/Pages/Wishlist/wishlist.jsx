import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function Wishlist({ wishlist, toggleWishlist }) {
    const navigate = useNavigate();

    return (
        <section className="p-5">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p className="text-gray-600">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-lg rounded-lg p-4 transition hover:shadow-xl"
                        >
                            <img
                                src={product.image1}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600">${product.price}</p>
                            <button
                                className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-400 transition"
                                onClick={() => toggleWishlist(product)}
                            >
                                <Trash2 className="inline w-5 h-5 mr-2" />
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-500 transition"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
        </section>
    );
}
