import css from './App.module.css';
import { useEffect, useState } from 'react';

import Description from '../Description/Description.jsx';
import Options from '../Options/Options.jsx';
import Feedback from '../Feedback/Feedback.jsx';

export default function App() {
  const LS_FEEDBACK = 'feedback';

  function rateInnit() {
    // ? It was made in a way that the app could be scaled in future

    // * You can simply add a new option (property to a 'rate' object) BELOW
    // * It'll render itself and work, but
    // ! after you manually delete 'feedback' in a browser Local Storage
    // ! In order to delete any property you've got to delete 'feedback' in LS again too

    const rate = {
      good: 0,
      neutral: 0,
      bad: 0,
      awesome: 0,
      poor: 0,
    };
    const savedRate = JSON.parse(localStorage.getItem(LS_FEEDBACK));

    return savedRate || rate;
  }

  const [rate, setRate] = useState(rateInnit);

  function recordToLocal() {
    localStorage.setItem(LS_FEEDBACK, JSON.stringify(rate));
  }

  useEffect(recordToLocal, [rate]);

  // ! Only add name of your new option in the array badFeedbackKeys BELOW if it's considered as a "bad feedback" variety

  const badFeedbackKeys = ['bad', 'poor'];
  const badFeedback = Object.fromEntries(
    Object.entries(rate).filter(([key]) => badFeedbackKeys.includes(key))
  );

  const initState = Object.fromEntries(Object.keys(rate).map(key => [key, 0]));
  const isStateInit = Object.keys(rate).every(key => rate[key] === 0);

  return (
    <div className={css.container}>
      <Description />
      <Options
        rate={rate}
        initState={initState}
        setRate={setRate}
        isStateInit={isStateInit}
      />
      <Feedback
        rate={rate}
        isStateInit={isStateInit}
        badFeedback={badFeedback}
      />
    </div>
  );
}
