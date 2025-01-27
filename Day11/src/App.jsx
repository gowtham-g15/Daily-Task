import { useState, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Laptop", price: 800, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9DHAbX1RMK-jOq00ffQkM7fA3-0ZQGEeZw&s" },
    { id: 2, name: "Smartphone", price: 500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBWojpFb-lzcdasdfrPFlYlEKspQkYTLtUA&s" },
    { id: 3, name: "Tablet", price: 300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgc38vOUsSv8FxgoVdMFtcdMLFAChk3oMhg&s" },
    { id: 4, name: "Smartwatch", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgjh8eBir1oEJ-O7cK_gF5J3GJn7kLTLXOQ&s" }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const handleAddToCart = (product, quantity) => {
    if (quantity > 0) {
      const updatedCart = [...cart];
      const existingProduct = updatedCart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += quantity; 
      } else {
        updatedCart.push({ ...product, quantity }); 
      }

      setCart(updatedCart);
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  return (
    <div className="container">
      <h1>Filterable Product List</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={clearSearch}>Clear</button>

      <p>Showing {filteredProducts.length} products</p>
      <ul className="products">
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <span>{formatPrice(product.price)}</span>

            {/* Quantity Input */}
            <input
              type="number"
              min="1"
              placeholder="Quantity"
              id={`quantity-${product.id}`}
            />
            <button
              onClick={() => {
                const quantity = parseInt(
                  document.getElementById(`quantity-${product.id}`).value,
                  10
                );
                handleAddToCart(product, quantity);
              }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      {/* Cart Section */}
      <h2>🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)} items)</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart">
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name} (x{item.quantity})</p>
              <span>{formatPrice(item.price * item.quantity)}</span>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
