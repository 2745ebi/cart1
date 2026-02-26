import React from "react";
import "./App.css";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { db } from "./firebase";
import * as firestore from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
  }

componentDidMount() {
  const q = firestore.query(
    firestore.collection(db, "products"),
    firestore.orderBy("title", "desc")
  );

  this.unsubscribe = firestore.onSnapshot(
    q,
    (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          price: Number(data.price || 0),
          qty: Number(data.qty || 0),
          img: data.img || ""
        };
      });

      this.setState({ products, loading: false });
    },
    (err) => console.error("Firebase Error:", err.message)
  );
}

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
handleIncreaseQuantity = async (product) => {
  const productRef = firestore.doc(db, "products", product.id);
  await firestore.updateDoc(productRef, {
    qty: product.qty + 1
  });
};

handleDecreaseQuantity = async (product) => {
  if (product.qty === 0) return;

  const productRef = firestore.doc(db, "products", product.id);
  await firestore.updateDoc(productRef, {
    qty: product.qty - 1
  });
};

handleDecreaseQuantity = async (product) => {
  if (product.qty === 0) return;

  const productRef = firestore.doc(db, "products", product.id);
  await firestore.updateDoc(productRef, {
    qty: product.qty - 1
  });
};

  getcountOfCartItems = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach(product => {
      count += product.qty;
    });

    return count;
  };

getcartTotal = () => {
  let total = 0;

  this.state.products.forEach((product) => {
    const qty = Number(product.qty);
    const price = Number(product.price);

    if (!isNaN(qty) && !isNaN(price)) {
      total += qty * price;
    }
  });

  return total;
};
handleAddProduct = async () => {
  await firestore.addDoc(
    firestore.collection(db, "products"),
    {
      title: "Washing machine",
      price: 999,
      qty: 1,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptuYy3X4ibk8tuMmYj2WzjP8kcL7l0jXN9w&s"
    }
  );
};
  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        {/* <button onClick={this.handleAddProduct} style={{padding:20, fontSize:20}}>Add a product</button>  */}
        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteQuantity={this.handleDeleteProduct}
          products={products}
        />
        {loading && (
          <div style={{ textAlign: "center" }}>
            <img 
              src="https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUybWtzN25wMXIwOTA5dTJyNXp6MWVkbWpqYWQwZjhmdWV5MXY4cXV5ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEjI6SIIHBdRxXI40/200w.gif"
            />
            <h4>Loading Products...</h4>
          </div>
        )}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getcartTotal()}
        </div>
      </div>
    );
  }
}

export default App;