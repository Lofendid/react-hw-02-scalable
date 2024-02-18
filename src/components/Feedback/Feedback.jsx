import css from './Feedback.module.css';

export default function Feedback({ rate, isStateInit, badFeedback }) {
  const total = Object.values(rate).reduce((total, value) => total + value, 0);
  const totalBad = Object.values(badFeedback).reduce(
    (total, value) => total + value,
    0
  );

  function calcPercentage() {
    const singlePercent = total / 100;
    const positivePercentage =
      Math.round((100 - (totalBad / singlePercent).toFixed(2)) * 100) / 100;

    return positivePercentage;
  }

  if (!isStateInit) {
    return (
      <>
        <ul className={css.list}>
          {Object.keys(rate).map(key => (
            <li key={key}>
              <p>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {rate[key]}
              </p>
            </li>
          ))}
        </ul>
        <p className={css.summary}>Total: {total}</p>
        <p className={css.summary}>
          Positive: <span className={css.accent}>{calcPercentage() || 0}%</span>
        </p>
      </>
    );
  } else return <p className={css.summary}>No feedback yet here, sorry.</p>;
}
