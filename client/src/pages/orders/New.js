import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/orderService";

function New({ user }) {
  let [table, setTable] = useState("");
  let subjectRef = useRef();
  let bodyRef = useRef();
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let order = {
      table,
      user,
    };
    const id = await createOrder(order);
    console.log(id)
    navigate(`/orders/${id}`);
  }

  const buttons = [];
  for (let i = 1; i <= 20; i++) {
    buttons.push(
      <button key={i} onClick={() => setTable(i)}>
        {i}
      </button>
    );
  }

  return (
    <div>
      <h1>Select Table:</h1>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="tbl">Table:</label>
        <br />
        <input type="text" id="tbl" value={table} readOnly />
        <br />
        <br /> */}

        <div>
          {buttons}
        </div>

        {/* <label htmlFor="nme">Subject:</label>
        <br />
        <input type="text" id="nme" ref={subjectRef} />
        <br />
        <br />

        <label htmlFor="clr">Body:</label>
        <br />
        <textarea id="clr" cols="30" rows="10" ref={bodyRef} />
        <br />
        <br />

        <button>Submit</button> */}
      </form>
    </div>
  );
}

export default New;
