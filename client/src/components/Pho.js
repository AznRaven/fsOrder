import MenuBtn from "./MenuBtn";

export default function Pho({ handleSubmit, input, setInput }) {
  let phoItem = [
    { name: "Chicken Pho", price: 8.99 },
    { name: "Beef Pho", price: 9.99 },
    { name: "Pork Pho", price: 8.99 },
  ];
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
                {phoItem.map((x) => {
                  return (
                    <div className="d-flex flex-column ">
                      <label for="floatingInput" className="">
                        {x.name}
                      </label>
                      <p>${x.price}</p>
                      <img
                        onClick={(e) => setInput(x.name)}
                        className="img-thumbnail rounded "
                        src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680339722/fsOrder/pho1_eevlyc.jpg"
                      ></img>
                    </div>
                  );
                })}
              </div>
              <MenuBtn handleSubmit={handleSubmit} input={input} />
            </form>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
