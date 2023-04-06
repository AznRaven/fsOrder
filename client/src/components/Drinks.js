import MenuBtn from "./MenuBtn";

export default function Drinks({ handleSubmit, input, setInput }) {
  let drinkItem = [
    { name: "Water", price: 1.99 },
    { name: "Sprite", price: 1.99 },
    { name: "Coke", price: 1.99 },
  ];
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
              {drinkItem.map((x) => {
                  return (
                    <div className="d-flex flex-column ">
                      <label for="floatingInput" className="">
                        {x.name}
                      </label>
                      <p>${x.price}</p>
                      <img
                        onClick={(e) => setInput(x.name)}
                        className="img-thumbnail rounded "
                        src="https://res.cloudinary.com/djzwz76tr/image/upload/v1680342587/fsOrder/coke_bfk3jy.png"
                      ></img>
                    </div>
                  );
                })}
                
              </div>

              <MenuBtn handleSubmit={handleSubmit} input={input} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
