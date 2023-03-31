import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createCommentForOrder,
  deleteCommentFromOrder,
} from "../../services/commentService";
import { deleteOrder, getOrder } from "../../services/orderService";

function Show({ user }) {
  const [order, setOrder] = useState({});
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const bodyRef = useRef();
  const detailsRef = useRef();

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

    const selectedOption = bodyRef.current.value;
    const buttonNumber = e.target.value;

    const newInput = `${selectedOption} ${buttonNumber}`;
    setInput(newInput);

    let comment = {
      body: input + e.target.value,
      user,
    };

    const newComment = await createCommentForOrder(comment, order._id);
    let updatedOrder = { ...order };
    updatedOrder.comments.push(newComment);
    setOrder(updatedOrder);
    bodyRef.current.value = "";
    detailsRef.current.open = false;
    setInput(null)
  }
  // async function multiply(e) {
  //   e.preventDefault();

  //   const selectedOption = bodyRef.current.value;
  //   const buttonNumber = e.target.value;

  //   const newInput = `${selectedOption} ${buttonNumber}`;
  //   setInput(newInput);
  // }

  return (
    <div>
      <div className="a-order">
        <h2>{order.subject}</h2>
        <h5 style={{ opacity: ".3" }} className="m-0">
          ordered by {order.user} on{" "}
          {new Date(order.createdAt).toLocaleDateString()} at{" "}
          {new Date(order.createdAt).toLocaleTimeString()}
        </h5>
        <h1 className="text-center">Table: {order.table}</h1>
        <div className="p-body m-0">{order.body}</div>
        {/* <div className="buttons">
          {order.user === user && (
            <>
              <button onClick={handleDeleteOrder}>Delete</button>
              <Link to={`/orders/${order._id}/edit`}>
                <button>Edit</button>
              </Link>
            </>
          )}
          <Link to="/orders">
            <button>Back</button>
          </Link>
        </div> */}
        <div class="row g-0 text-center">
          <div class="col-sm-6 col-md-2">
            {order.comments?.length ? (
              <>
                <div>Order:</div>
                <div>
                  {order.comments.map((comment, i) => (
                    <div key={i} className="comm">
                      <div>{comment.user}</div>
                      <div>{comment.body}</div>
                      {comment.user === user && (
                        <>
                          <button onClick={() => handleDeleteComment(comment)}>
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
          {/* Add to Orders */}
          <div class="col-6 col-md-10" >
            {user && (
              <div ref={detailsRef}>
                {/* <summary style={{ opacity: ".5" }}>Add To Order:</summary> */}

                <form onSubmit={handleSubmit}>
                  <select
                    ref={bodyRef}
                    style={{overflow: "hidden",whiteSpace: 'normal'}}
                    class="form-select-lg text-center"
                    size="6"
                    multiple
                    aria-label="multiple select example"
                    onChange={() => setInput(bodyRef.current.value)}
                  >
                    <option value="Chicken Stir Fry">Chicken Stir Fry</option>
                    <option value="Beef Stir Fry">Beef Stir Fry</option>
                    <option value="Port Stir Fry">Port Stir Fry</option>
                    <option value="Chicken Pho">Chicken Pho</option>
                    <option value="Beef Pho">Beef Pho</option>
                    <option value="Pork Pho">Pork Pho</option>
                    <option value="Chicken Ramen">Chicken Ramen</option>
                    <option value="Beef Ramen">Beef Ramen</option>
                    <option value="Pork Ramen">Pork Ramen</option>
                    <option value="Chicken Soup">Chicken Soup</option>
                    <option value="Beef Soup">Beef Soup</option>
                    <option value="Pork Soup">Pork Soup</option>
                    <option value="Water">Water</option>
                    <option value="Coke">Coke</option>
                    <option value="Sprite">Sprite</option>
                  </select>
                  <div>
                    {input && <button className="mx-2" value="" onClick={handleSubmit}>
                      1
                    </button>}
                    {input && <button className="mx-2" value=" x2" onClick={handleSubmit}>
                      2
                    </button>}
                    {input && <button className="mx-2" value=" x3" onClick={handleSubmit}>
                      3
                    </button>}
                    {input && <button className="mx-2" value=" x4" onClick={handleSubmit}>
                      4
                    </button>}
                    {input && <button className="mx-2" value=" x5" onClick={handleSubmit}>
                      5
                    </button>}
                    {input && <button className="mx-2" value=" x6" onClick={handleSubmit}>
                      6
                    </button>}
                    {input && <button className="mx-2" value=" x7" onClick={handleSubmit}>
                      7
                    </button>}
                    {input && <button className="mx-2" value=" x8" onClick={handleSubmit}>
                      8
                    </button>}
                    {input && <button className="mx-2" value=" x9" onClick={handleSubmit}>
                      9
                    </button>}
                    {input && <button className="mx-2" value=" x10" onClick={handleSubmit}>
                      10
                    </button>}
                  </div>
                </form>
                
                
              </div>
            )}

            <div className="buttons">
              {order.user === user && (
                  <button onClick={handleDeleteOrder}>Delete</button>
              )}
              <Link to="/orders">
                <button>Back</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
