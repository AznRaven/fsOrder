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
  const phoRef = useRef();
  const soupRef = useRef();
  const drinksRef = useRef();

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
    <div className=" bg-dark text-white text-center">
      <div className="a-order">
        <h2>{order.subject}</h2>
        <h5 style={{ opacity: ".3" }} className="m-0">
          ordered by {order.user} on{" "}
          {new Date(order.createdAt).toLocaleDateString()} at{" "}
          {new Date(order.createdAt).toLocaleTimeString()}
        </h5>
        <div className="p-body m-0">{order.body}</div>
        <div class="row g-0 text-center">
          <div class="col-sm-6 col-md-2 ">
            {order.comments?.length ? (
              <>
              <br/>
              <br/>
              <br/>
                <div className="fs-2">Items Ordered</div>
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
          <div class="col-6 col-md-10">
            {user && (
              <div ref={detailsRef}>
                <div  style={{ }}>{input}</div>
                <div class="accordion accordion-flush bg-dark" data-bs-theme="dark" id="accordionExample">
                  {/* Pho */}
                  <div class="accordion-item bg-dark " >
                    <h2 class="accordion-header ">
                      <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Pho
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <form onSubmit={handleSubmit} >
                          {/* <textarea ref={bodyRef} id="lc" cols="1" rows="1" /> */}
                          <select
                            ref={phoRef}
                            class="form-select-lg bg-dark text-white"
                            style={{ whiteSpace: "normal", overflow: "hidden" }}
                            onChange={(e) => setInput(e.target.value)}
                            multiple
                            aria-label="multiple select example"
                            
                          >
                            {/* <option selected>Open this select menu</option> */}
                            <option  value="Chicken Pho">Chicken Pho</option>
                            <option value="Beef Pho">Beef Pho</option>
                            <option value="Pork Pho">Pork Pho</option>
                          </select>

                          <div>
                            {input && (
                              <button
                                className="mx-2"
                                value=""
                                onClick={handleSubmit}
                              >
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
                        </form>{" "}
                      </div>
                    </div>
                  </div>
                  {/* Soup */}
                  <div class="accordion-item  bg-dark">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        Soup
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                      <form onSubmit={handleSubmit}>
                  {/* <textarea ref={bodyRef} id="lc" cols="1" rows="1" /> */}
                  <select
                    ref={soupRef}
                    class="form-select-lg"
                    style={{ whiteSpace: "normal", overflow: "hidden" }}
                    onChange={(e) => setInput(e.target.value)}
                    multiple
                    aria-label="multiple select example"
                  >
                    {/* <option selected>Open this select menu</option> */}
                    <option value="Chicken Soup">Chicken Soup</option>
                    <option value="Beef Soup">Beef Soup</option>
                    <option value="Pork Soup">Pork Soup</option>
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
                      </div>
                    </div>
                  </div>
                  {/* Drinks */}
                  <div class="accordion-item  bg-dark">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        Drinks
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                      <form onSubmit={handleSubmit}>
                  {/* <textarea ref={bodyRef} id="lc" cols="1" rows="1" /> */}
                  <select
                    ref={drinksRef}
                    class="form-select-lg"
                    style={{ whiteSpace: "normal", overflow: "hidden" }}
                    onChange={(e) => setInput(e.target.value)}
                    multiple
                    aria-label="multiple select example"
                  >
                    {/* <option selected>Open this select menu</option> */}
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
                      </div>
                    </div>
                  </div>
                </div>
                
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
