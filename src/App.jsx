import React from "react";
import "./App.css";
import Cart from "./Cart";
import Navbar from "./Navbar";
import { db } from "./firebase";
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    }
  }

  componentDidMount() {
    const q = query(collection(db, "products"));
    this.unsubscribe = onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        // Convert to numbers to fix string concatenation bug
        data.Qty = Number(data.qty || data.Qty || 0);
        data.Price = Number(data.price || data.Price || 0);
        data.Title = data.title || data.Title || "";
        data.img = data.img || "";
        return data;
      });
      this.setState({ products: products, loading: false });
    }, (err) => console.error("Firebase Error:", err.message));
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleIncreaseQuantity = product => {
    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].Qty += 1;

    this.setState({
      products
    });
  };

  handleDecreaseQuantity = product => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].Qty === 0) {
      return;
    }
    products[index].Qty -= 1;

    this.setState({
      products
    });
  };

  handleDeleteProduct = id => {
    const { products } = this.state;

    const items = products.filter(product => product.id !== id);

    this.setState({
      products: items
    });
  };

  getcountOfCartItems = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach(product => {
      count += product.Qty || 0;
    });

    return count;
  };

  getcartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.forEach(product => {
      if (product.Qty > 0) {
        cartTotal = cartTotal + product.Qty * product.Price;
      }
    });

    return cartTotal;
  };
  handleAddProduct=()=>{
    this.db.collection('products').add({
        img:'',
        title:'washing machine',
        price: 999,
        qty: 1
  }).then((docRef)=>{
    console.log('Product has been added', docRef);
  })
  .catch((error)=>{
    console.error("Error adding product: ", error);
  });
}

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        <button onClick={this.handleAddProduct} style={{padding:20, fontSize:20}}>Add a product</button>
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