import css from './Options.module.css';

export default function Options({ rate, isStateInit, initState, setRate }) {
  function handleRate(e) {
    const option = e.target.name;
    setRate(prevRate => ({
      ...prevRate,
      [option]: prevRate[option] + 1,
    }));
  }
  function handleReset() {
    setRate(initState);
  }

  return (
    <>
      <ul className={css.list}>
        {Object.keys(rate).map(key => (
          <li key={key}>
            <button
              className={css.optionBtn}
              name={key}
              onClick={handleRate}
              type="button"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          </li>
        ))}
      </ul>
      {!isStateInit && (
        <button className={css.resetBtn} onClick={handleReset} type="button">
          Reset
        </button>
      )}
    </>
  );
}
