import MenuBtn from "./MenuBtn";

export default function MenuItem({
  handleSubmit,
  index,
  input,
  setInput,
  category,
  item,
}) {
  return (
    <>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed bg-danger text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls={index}
          >
            {category}
          </button>
        </h2>
        <div
          id={index}
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-evenly">
                {/* {item.map((x) => {
                  return (
                    <div className="d-flex flex-column ">
                      <label for="floatingInput" className="">
                        {x}
                      </label>
                      <img
                        onClick={(e) => setInput("Water")}
                        className="img-thumbnail rounded "
                        src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680342587/fsOrder/coke_bfk3jy.png"
                      ></img>
                    </div>
                  );
                })} */}
              </div>

              <MenuBtn handleSubmit={handleSubmit} input={input} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
