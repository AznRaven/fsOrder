import MenuBtn from "./MenuBtn";

export default function Soup({ handleSubmit, input, setInput }) {

    return(
    <>
<div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed  bg-danger text-white"
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
                              <label for="floatingInput" className="">
                                Chicken Soup
                              </label>
                              <img
                                onClick={(e) => setInput("Chicken Soup")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="">
                                Beef Soup
                              </label>
                              <img
                                onClick={(e) => setInput("Beef Soup")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                            <div className="d-flex flex-column">
                              <label for="floatingInput" className="">
                                Pork Soup
                              </label>
                              <img
                                onClick={(e) => setInput("Pork Soup")}
                                className="img-thumbnail rounded "
                                src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                              ></img>
                            </div>
                          </div>

                          <MenuBtn handleSubmit={handleSubmit} input={input} />
                        </form>
                      </div>
                    </div>
                  </div>
    </>
    )
}