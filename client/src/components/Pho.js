import MenuBtn from "./MenuBtn";

export default function Pho({ handleSubmit, input, setInput }) {
  return (
    <>
      <div class="accordion-item ">
        <h2 class="accordion-header ">
          <button
            class="accordion-button bg-danger text-white"
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
                  <label for="floatingInput" className="">
                    Chicken Pho
                  </label>
                  <img
                    onClick={(e) => setInput("Chicken Pho")}
                    className="img-thumbnail rounded "
                    src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                  ></img>
                </div>
                <div className="d-flex flex-column">
                  <label for="floatingInput" className="">
                    Beef Pho
                  </label>
                  <img
                    onClick={(e) => setInput("Beef Pho")}
                    className="img-thumbnail rounded "
                    src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                  ></img>
                </div>
                <div className="d-flex flex-column">
                  <label for="floatingInput" className="">
                    Pork Pho
                  </label>
                  <img
                    onClick={(e) => setInput("Pork Pho")}
                    className="img-thumbnail rounded "
                    src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                  ></img>
                </div>
              </div>
              <MenuBtn handleSubmit={handleSubmit} input={input} />
            </form>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
