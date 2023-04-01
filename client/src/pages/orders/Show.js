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
    <div className="text-center bg-dark">
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
                            className="text-danger"
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
                  {/* Pho */}
                  <div class="accordion-item bg-dark ">
                    <h2 class="accordion-header ">
                      <button
                        class="accordion-button bg-secondary text-white"
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
                        <form onSubmit={handleSubmit}>
                          
                          <div className="d-flex justify-content-evenly">
                            <div className="d-flex flex-column ">
                              <label for="floatingInput" className="text-white">
                                Chicken Pho
                              </label>
                              <img
                                onClick={(e) => setInput("Chicken Pho")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="text-white">
                                Beef Pho
                              </label>
                              <img
                                onClick={(e) => setInput("Beef Pho")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="text-white">
                                Pork Pho
                              </label>
                              <img
                                onClick={(e) => setInput("Pork Pho")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                          </div>
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
                        class="accordion-button collapsed  bg-secondary text-white"
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
                        <div className="d-flex justify-content-evenly">
                            <div className="d-flex flex-column ">
                              <label for="floatingInput" className="text-white">
                                Chicken Soup
                              </label>
                              <img
                                onClick={(e) => setInput("Chicken Soup")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="text-white">
                                Beef Soup
                              </label>
                              <img
                                onClick={(e) => setInput("Beef Soup")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="text-white">
                                Pork Soup
                              </label>
                              <img
                                onClick={(e) => setInput("Pork Soup")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                          </div>

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
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* Drinks */}
                  <div class="accordion-item  bg-dark">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed  bg-secondary text-white"
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
                        <div className="d-flex justify-content-evenly">
                            <div className="d-flex flex-column ">
                              <label for="floatingInput" className="text-white">
                                Water
                              </label>
                              <img
                                onClick={(e) => setInput("Water")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680342587/fsOrder/coke_bfk3jy.png"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="text-white">
                                Sprite
                              </label>
                              <img
                                onClick={(e) => setInput("Sprite")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680342587/fsOrder/coke_bfk3jy.png"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="text-white">
                                Coke
                              </label>
                              <img
                                onClick={(e) => setInput("Coke")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680342587/fsOrder/coke_bfk3jy.png"
                              ></img>
                            </div>
                          </div>

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
                        </form>
                      </div>
                    </div>
                  </div>
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
                  style={{ width: "8vw" }}
                  class="btn btn-outline-danger"
                >
                  Delete Order
                </button>
              )}
              <Link to="/orders">
                {/* <button>Back</button> */}
                <button type="button" class="btn btn-outline-light">
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
