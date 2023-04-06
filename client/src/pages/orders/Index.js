import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../services/orderService";

function formatElapsedTime(time) {
  const seconds = Math.floor((new Date() - new Date(time)) / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  const weeks = Math.floor(days / 7);

  return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
}

function Index({ user }) {
  const [orders, setOrders] = useState([]);
  let [listType, setListType] = useState("all");

  useEffect(() => {
    async function loadData() {
      const data = await getAllOrders();
      setOrders(data);
      console.log("all orders", data);
    }
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders([...orders]); // force re-render
    }, 1000);
    return () => clearInterval(interval);
  }, [orders]);

  async function completeOrder(id) {
    let newOrders = [...orders];
    let index = newOrders.findIndex((t) => t._id === id);
    let order = newOrders[index];
    order.completed = !order.completed;

    await fetch(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setOrders(newOrders);
  }
  async function paidOrder(id) {
    let newOrders = [...orders];
    let index = newOrders.findIndex((t) => t._id === id);
    let order = newOrders[index];
    order.paid = !order.paid;
  
    await fetch(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    setOrders(newOrders);
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* <RefreshPage/> */}
      <h1>All Orders</h1>
      {user && (
        <div className="d-flex">
          <Link to="/orders/new" className="mx-2">
            <button>NEW ORDER</button>
          </Link>
          <button className="mx-2" onClick={() => setListType("all")}>
            All
          </button>
          <button className="mx-2" onClick={() => setListType("complete")}>
            Completed
          </button>
          <button className="mx-2" onClick={() => setListType("incomplete")}>
            Incomplete
          </button>
        </div>
      )}
      <br />
      <br />
      {/* Map through orders */}
      <div
        id="orders"
        className="d-flex flex-wrap text-center shadow align-items-center justify-content-center"
      >
        {orders?.map((order, index) => (
          <div>
            <Link to={`/orders/${order._id}`} key={index}>
              <div
                className={`a-order order m-2 shadow ${
                  new Date() - new Date(order.createdAt) > 30 * 60 * 1000
                    ? "text-black"
                    : ""
                }`}
                style={{
                  border:
                    new Date() - new Date(order.createdAt) > 30 * 60 * 1000
                      ? "2px solid red"
                      : "2px solid blue",
                }}
              >
                <div className="" style={{color: new Date() - new Date(order.createdAt) > 30 * 60 * 1000
                      ? "red"
                      : "blue",
                }}>Time: {formatElapsedTime(order.createdAt)}</div>
                <br />
                <strong className="fs-5 text-black">Table: {order.table}</strong>
                <br />
                {order.comments.map((x, index) => (
                  <>
                    {x.body}
                    <br />
                  </>
                ))}
              </div>
            </Link>
            <div></div>
            {/* Completed */}
            {/* <li
              style={{ listStyle: "none" }}
              className="justify-content-center align-items-end d-flex"
            >
              <div class="form-check ">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={order.completed}
                  value=""
                  id={order.table}
                />
                <label class="form-check-label" for={order.table}>
                  Completed
                </label>
              </div>
            </li> */}
            {/* Paid */}
            {/* <li
              style={{ listStyle: "none" }}
              className="justify-content-center align-items-end d-flex"
            >
              <div class="form-check ">
                <input
                  class="form-check-input"
                  type="checkbox"
                  checked={order.paid}
                  onChange={() => paidOrder(order._id)}
                  value=""
                  id={order._id}
                />
                <label class="form-check-label" for={order._id}>
                  Paid
                </label>
              </div>
            </li> */}
          </div>
        ))}
      </div>
      {user && (
        <div className="d-flex">
          <Link to="/orders/new" className="mx-2">
            <button>NEW ORDER</button>
          </Link>
          <button className="mx-2" onClick={() => setListType("all")}>
            All
          </button>
          <button className="mx-2" onClick={() => setListType("complete")}>
            Completed
          </button>
          <button className="mx-2" onClick={() => setListType("incomplete")}>
            Incomplete
          </button>
        </div>
      )}
    </div>
  );
}

export default Index;
