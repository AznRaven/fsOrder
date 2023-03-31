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
    setInput(null);
  }

  return (
    <div>
      <div className="a-order">
        <h2>{order.subject}</h2>
        <h5 style={{ opacity: ".3" }} className="m-0">
          ordered by {order.user} on{" "}
          {new Date(order.createdAt).toLocaleDateString()} at{" "}
          {new Date(order.createdAt).toLocaleTimeString()}
        </h5>
        <div className="p-body m-0">{order.body}</div>
        <div class="row g-0 text-center">
          {/* Items Ordered */}
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
                          <button onClick={() => handleDeleteComment(comment)} style={{color: "red"}}>
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
          <div class="col-6 col-md-10">
            {user && (
              <div ref={detailsRef}>
                <summary className="fs-2">{input}</summary>
                <form onSubmit={handleSubmit}>
                  {/* <textarea ref={bodyRef} id="lc" cols="1" rows="1" /> */}
                  <select
                    ref={bodyRef}
                    class="form-select-lg"
                    style={{ whiteSpace: "normal", overflow: "hidden" }}
                    onChange={(e) => setInput(e.target.value)}
                    multiple
                    aria-label="multiple select example"
                  >
                    {/* <option selected>Open this select menu</option> */}
                    <option value="Chicken Pho">Chicken Phos</option>
                    <option value="Beef Pho">Beef Pho</option>
                    <option value="Pork Pho">Pork Pho</option>
                    <option value="Chicken Soup">Chicken Soup</option>
                    <option value="Beef Soup">Beef Soup</option>
                    <option value="Pork Soup">Pork Soup</option>
                    <option value="Chicken Rice">Chicken Rice</option>
                    <option value="Beef Rice">Beef Rice</option>
                    <option value="Pork Rice">Pork Rice</option>

                    <option value="Water">Water</option>
                    <option value="Coke">Coke</option>
                    <option value="Sprite">Sprite</option>
                  </select>

                  <div>
                    {input && (
                      <button className="mx-2" value="" onClick={handleSubmit}>
                        1
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x2"
                        onClick={handleSubmit}
                      >
                        2
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x3"
                        onClick={handleSubmit}
                      >
                        3
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x4"
                        onClick={handleSubmit}
                      >
                        4
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x5"
                        onClick={handleSubmit}
                      >
                        5
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x6"
                        onClick={handleSubmit}
                      >
                        6
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x7"
                        onClick={handleSubmit}
                      >
                        7
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x8"
                        onClick={handleSubmit}
                      >
                        8
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x9"
                        onClick={handleSubmit}
                      >
                        9
                      </button>
                    )}
                    {input && (
                      <button
                        className="mx-2"
                        value=" x10"
                        onClick={handleSubmit}
                      >
                        10
                      </button>
                    )}
                  </div>
                </form>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Accordion Item #1
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <strong>
                          This is the first item's accordion body.
                        </strong>{" "}
                        It is shown by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Accordion Item #2
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <strong>
                          This is the second item's accordion body.
                        </strong>{" "}
                        It is hidden by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Accordion Item #3
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <strong>
                          This is the third item's accordion body.
                        </strong>{" "}
                        It is hidden by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="buttons">
              {user && (
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
