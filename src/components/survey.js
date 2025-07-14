import React, { useState } from 'react';
import SimplifyPage from './survey_test';

const SurveyParent = ({onComplete}) => {
  const [passageIndex, setPassageIndex] = useState(0);

  const goNext = () => {
    setPassageIndex(prev => prev + 1);
  };

  const goBack = () => {
    if (passageIndex > 0) {
      setPassageIndex(prev => prev - 1);
      console.log("Back clicked, passageIndex:", passageIndex - 1);
    }
  };

  return (
    <SimplifyPage
      key={passageIndex}
      passageIndex={passageIndex} // Forces reload on passage change
      onNext={goNext}
      onComplete={onComplete}
    />
  );
};

export default SurveyParent;
