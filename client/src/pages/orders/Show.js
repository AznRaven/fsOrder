import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createCommentForOrder,
  deleteCommentFromOrder,
} from "../../services/commentService";
import { deleteOrder, getOrder } from "../../services/orderService";
import Drinks from "../../components/Drinks";
import Pho from "../../components/Pho";
import Soup from "../../components/Soup";
import MenuItem from "../../components/MenuItem";

function Show({ user }) {
  const [order, setOrder] = useState({});
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  // const phoRef = useRef();
  // const soupRef = useRef();
  // const drinksRef = useRef();
  const detailsRef = useRef();

  let Categories = ['Pho', 'Soup', 'Drinks']



  useEffect(() => {
    async function loadData() {
      const data = await getOrder(params.id);
      if (!data) navigate("/orders");
      setOrder(data);
    }
    loadData();
  }, [params.id]);

  async function handleDeleteComment(comment) {
    await deleteCommentFromOrder(comment._id, order._id);
    let updatedOrder = { ...order };
    updatedOrder.comments = updatedOrder.comments.filter(
      (c) => c._id !== comment._id
    );
    setOrder(updatedOrder);
  }

  async function handleDeleteOrder() {
    await deleteOrder(order._id);
    navigate("/orders");
  }
  // submit
  async function handleSubmit(e) {
    e.preventDefault();

    let comment = {
      body: input + e.target.value,
      user,
    };

    const newComment = await createCommentForOrder(comment, order._id);
    let updatedOrder = { ...order };
    updatedOrder.comments.push(newComment);
    setOrder(updatedOrder);
    detailsRef.current.open = false;
    setInput(null);
  }

  return (
    <div className="text-center">
      {/* Ordered By */}
      <div className="a-order">
        <h2>{order.subject}</h2>
        <h5 style={{ opacity: ".3" }} className="m-0">
          ordered by {order.user} on{" "}
          {new Date(order.createdAt).toLocaleDateString()} at{" "}
          {new Date(order.createdAt).toLocaleTimeString()}
        </h5>
        <br />
        <div className="p-body m-0 border-bottom">{order.body}</div>
        <div class="row g-0 text-center">
          <div class="col-sm-6 col-md-2 border-end">
            {order.comments?.length ? (
              <>
                <br />
                <br />
                <br />
                <div className="fs-2">Items Ordered</div>
                <div>
                  {order.comments.map((comment, i) => (
                    <div key={i} className="comm">
                      <div>{comment.user}</div>
                      <div>{comment.body}</div>
                      {user && (
                        <>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteComment(comment)}
                          >
                            X
                          </button>
                          <Link
                            to={`/orders/${order._id}/comments/${comment._id}`}
                          >
                            <span>+</span>
                          </Link>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <br />
                <br />
              </>
            ) : (
              ""
            )}
          </div>
          <div class=" col-10">
            {user && (
              <div ref={detailsRef}>
                <div style={{}}>{input}</div>
                <div class="accordion accordion-flush" id="accordionExample">
                  {/* {Categories.map((x,index) => <MenuItem
                  handleSubmit={handleSubmit}
                  index={index}
                  input={input}
                  setInput={setInput} 
                  category={x}/>)} */}
                  {/* Pho */}
                  <Pho
                    handleSubmit={handleSubmit}
                    input={input}
                    setInput={setInput}
                  />
                  {/* Soup */}
                  <Soup
                    handleSubmit={handleSubmit}
                    input={input}
                    setInput={setInput}
                  />
                  {/* Drinks */}
                  <Drinks
                    handleSubmit={handleSubmit}
                    input={input}
                    setInput={setInput}
                  />
                </div>
              </div>
            )}
            {/* Buttons */}
            <div className="d-flex justify-content-evenly">
              {user && (
                // <button onClick={handleDeleteOrder}>Delete</button>
                <button
                  type="button"
                  onClick={handleDeleteOrder}
                  style={{ width: "12vw" }}
                  class="btn btn-outline-danger"
                >
                  Delete Order
                </button>
              )}
              <Link to="/orders">
                {/* <button>Back</button> */}
                <button type="button" style={{ width: "12vw" }} class="btn btn-outline-dark">
                  All Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
