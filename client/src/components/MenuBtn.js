export default function MenuBtn({handleSubmit, input}) {
    
  return (
    <>
      <div>
        {input && (
          <button className="mx-2" value="" onClick={handleSubmit}>
            1
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x2" onClick={handleSubmit}>
            2
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x3" onClick={handleSubmit}>
            3
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x4" onClick={handleSubmit}>
            4
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x5" onClick={handleSubmit}>
            5
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x6" onClick={handleSubmit}>
            6
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x7" onClick={handleSubmit}>
            7
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x8" onClick={handleSubmit}>
            8
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x9" onClick={handleSubmit}>
            9
          </button>
        )}
        {input && (
          <button className="mx-2" value=" x10" onClick={handleSubmit}>
            10
          </button>
        )}
      </div>
    </>
  );
}
