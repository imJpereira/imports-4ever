import React, { createContext, useState, useContext, useMemo } from 'react';

const ShoppingCartContext = createContext({});

export default function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1}];
      }
    });
  };


  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };


  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.value * item.quantity), 0);
  }, [cartItems]);
  

  const cartItemCount = useMemo(() => {
      return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);


  return (
    <ShoppingCartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      clearCart,
      cartTotal,
      cartItemCount,
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}


export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart deve ser usado dentro de um ShoppingCartProvider');
  }
  return context;
}