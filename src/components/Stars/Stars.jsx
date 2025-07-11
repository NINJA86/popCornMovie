import React, { useState } from 'react';
import Star from '../StartRating/Star';

function Stars() {
  const [rate, setRate] = useState(0);

  return (
    <div>
      {Array.from({ length: 10 }, (_, i) => (
        <Star key={i} isFilled={rate > i} onRate={setRate} rate={i} />
      ))}
      <span>{rate}</span>
    </div>
  );
}

export default Stars;
