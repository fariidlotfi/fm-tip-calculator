import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [bill, setBill] = useState(null);
  const [tip, setTip] = useState(null);
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(null);
  const [tipAmout, setTipAmount] = useState(null);

  const customTipRef = useRef();

  useEffect(() => {
    let res = 0;
    if (bill && tip) {
      res = (bill * (tip / 100)).toFixed(2);

      count > 1
        ? setTipAmount((parseFloat(res) / count).toFixed(2))
        : setTipAmount(parseFloat(res).toFixed(2));

      count > 1
        ? setTotal(
            (
              (parseFloat(bill) + parseFloat(res)).toFixed(2) / parseInt(count)
            ).toFixed(2)
          )
        : setTotal((parseFloat(bill) + parseFloat(res)).toFixed(2));
    }
  }, [bill, tip, count]);

  return (
    <>
      <main className="app">
        <section className="inputs">
          <section className="bill-inputs">
            <label htmlFor="bill">Bill</label>
            <input
              min={0}
              type="number"
              name="bill"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
            />
            <img
              src="icon-dollar.svg"
              alt="dollar icon"
              className="dollar-icon"
            />
          </section>

          <section className="tip-inputs">
            <label>Select Tip %</label>
            <section className="tip_buttons">
              <button
                className={`tip-button ${tip == 5 ? "active" : ""}`}
                onClick={() => {
                  setTip(5);
                  customTipRef.current.value = "";
                }}
              >
                5%
              </button>
              <button
                className={`tip-button ${tip == 10 ? "active" : ""}`}
                onClick={() => {
                  setTip(10);
                  customTipRef.current.value = "";
                }}
              >
                10%
              </button>
              <button
                className={`tip-button ${tip == 15 ? "active" : ""}`}
                onClick={() => {
                  setTip(15);
                  customTipRef.current.value = "";
                }}
              >
                15%
              </button>
              <button
                className={`tip-button ${tip == 25 ? "active" : ""}`}
                onClick={() => {
                  setTip(25);
                  customTipRef.current.value = "";
                }}
              >
                25%
              </button>
              <button
                className={`tip-button ${tip == 50 ? "active" : ""}`}
                onClick={() => {
                  setTip(50);
                  customTipRef.current.value = "";
                }}
              >
                50%
              </button>
              <input
                min={0}
                max={100}
                type="number"
                ref={customTipRef}
                onChange={(e) => setTip(e.target.value)}
                placeholder="Custom"
              />
            </section>
          </section>

          <section className="people-inputs">
            <label htmlFor="count">Number of People</label>
            <input
              min={0}
              className={count <= 0 ? "error" : ""}
              name="count"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            {count <= 0 ? (
              <span className="count-error">Cant be zero</span>
            ) : (
              ""
            )}
            <img
              src="icon-person.svg"
              alt="person icon"
              className="person-icon"
            />
          </section>
        </section>

        <section className="output">
          <section className="tip-amount-section">
            <section>
              <p className="output-title-text">Tip Amount</p>
              <p className="output-subtitle-text">/ person</p>
            </section>
            <h1 className="show-result">{tipAmout ?? "0"}</h1>
          </section>
          <section className="tip-amount-section">
            <section>
              <p className="output-title-text">Total</p>
              <p className="output-subtitle-text">/ person</p>
            </section>
            <h1 className="show-result">{total ?? "0"}</h1>
          </section>

          <button
            className="reset-button"
            onClick={() => {
              setBill(0);
              setCount(1);
              setTip(0);
              setTipAmount(0);
              setTotal(0);
            }}
          >
            RESET
          </button>
        </section>
      </main>
    </>
  );
}

export default App;
