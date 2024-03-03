import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const tipsAmount = [5, 10, 15, 25, 50];

  const handleCalculating = useCallback(() => {
    const res = (parseFloat(bill) * (parseFloat(tip) / 100)).toFixed(2);

    if (count > 1) {
      setTipAmount((parseFloat(res) / count).toFixed(2));
      setTotal(
        ((parseFloat(bill) + parseFloat(res)) / Number(count)).toFixed(2)
      );
    } else {
      setTipAmount(parseFloat(res).toFixed(2));
      setTotal((parseFloat(bill) + parseFloat(res)).toFixed(2));
    }
  }, [bill, tip, count]);

  useEffect(() => {
    handleCalculating();
  }, [handleCalculating]);

  function handleTipInput() {
    return (event) => {
      setTip(parseInt(event.target.value));
      setInputValue(event.target.value);
    };
  }

  function handleTipButtons(tip) {
    setTip(tip);
    setInputValue("");
  }

  function reset() {
    setBill(0);
    setCount(1);
    setTip(0);
    setTipAmount("0.00");
    setTotal("0.00");
    setInputValue("");
  }

  return (
    <main className="app">
      <section className="inputs">
        <section className="bill-inputs">
          <label htmlFor="bill">Bill</label>
          <input
            min={0}
            type="number"
            name="bill"
            value={bill}
            onChange={(e) => setBill(parseInt(e.target.value))}
          />
          <img
            src="/fm-tip-calculator/icon-dollar.svg"
            alt="dollar icon"
            className="dollar-icon"
          />
        </section>

        <section className="tips">
          <label>Select Tip %</label>
          <section className="tip_buttons">
            {tipsAmount.map((amount) => (
              <button
                key={amount}
                className={`tip-button ${tip === amount ? "active" : ""}`}
                onClick={() => handleTipButtons(amount)}
              >
                {amount}%
              </button>
            ))}

            <input
              min={0}
              max={100}
              type="number"
              value={inputValue}
              onChange={handleTipInput()}
              placeholder="Custom"
              className="tip-input"
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
          {count <= 0 && <span className="count-error">Cant be zero</span>}
          <img
            src="/fm-tip-calculator/icon-person.svg"
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
          <h1 className="show-result">{tipAmount}</h1>
        </section>
        <section className="tip-amount-section">
          <section>
            <p className="output-title-text">Total</p>
            <p className="output-subtitle-text">/ person</p>
          </section>
          <h1 className="show-result">{total}</h1>
        </section>

        <button className="reset-button" onClick={reset}>
          RESET
        </button>
      </section>
    </main>
  );
}

export default App;
