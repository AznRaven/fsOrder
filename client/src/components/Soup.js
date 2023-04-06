import MenuBtn from "./MenuBtn";

export default function Soup({ handleSubmit, input, setInput }) {
  let soupItem = [
    { name: "Chicken Soup", price: 8.99 },
    { name: "Beef Soup", price: 9.99 },
    { name: "Pork Soup", price: 8.99 },
  ];
  return (
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
              {soupItem.map((x) => {
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
