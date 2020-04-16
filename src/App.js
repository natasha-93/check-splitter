import React, { useState } from "react";
import "./App.css";

const defaultNewOrder = {
  name: "",
  price: "",
};

function App() {
  const [people, setPeople] = useState(["Trey", "Tash"]);
  const [newPerson, setNewPerson] = useState("");
  const [orders, setOrders] = useState([
    {
      name: "Chicken Burrito",
      price: 1200,
    },
    {
      name: "Tuna Happy Bowl",
      price: 2000,
    },
    {
      name: "Edamame",
      price: 500,
    },
  ]);
  const [newOrder, setNewOrder] = useState(defaultNewOrder);

  const total = orders.reduce((total, order) => total + order.price, 0);

  const pricePerPerson = total / people.length;

  function toDollars(x) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(x / 100);
  }

  return (
    <div className="App">
      <h2>Check Splitter</h2>
      <div className="Orders">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOrders([
              ...orders,
              { ...newOrder, price: Number(newOrder.price) },
            ]);
            setNewOrder(defaultNewOrder);
          }}
        >
          <input
            required
            value={newOrder.name}
            placeholder="Add Food Item.."
            onChange={(e) => {
              setNewOrder({ ...newOrder, name: e.target.value });
            }}
          ></input>
          <input
            required
            type="number"
            value={newOrder.price}
            placeholder="Add Price.."
            onChange={(e) => {
              setNewOrder({ ...newOrder, price: e.target.value });
            }}
          ></input>
          <button>Add Order</button>
        </form>
        <div>
          <ul>
            {orders.map(({ name, price }, index) => (
              <React.Fragment key={index}>
                <li>
                  {name} - {toDollars(price)}
                  <button
                    onClick={(e) => {
                      const newOrders = orders.filter((order, i) => {
                        return i !== index;
                      });
                      setOrders(newOrders);
                    }}
                  >
                    X
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div>Total: {toDollars(total)}</div>
      </div>
      <div className="People">
        <form
          onSubmit={(e) => {
            setPeople([...people, newPerson]);
            setNewPerson("");
            e.preventDefault();
          }}
        >
          <input
            required
            value={newPerson}
            placeholder="New Person name.. "
            onChange={(e) => {
              setNewPerson(e.target.value);
            }}
          />
          <button type="submit">Add New Person</button>
        </form>
        <ul>
          {people.map((name, index) => (
            <React.Fragment key={index}>
              <li>
                {name} - {toDollars(pricePerPerson)}
                <button
                  onClick={(e) => {
                    const newPeople = people.filter((name, i) => {
                      return i !== index;
                    });
                    setPeople(newPeople);
                  }}
                >
                  X
                </button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
