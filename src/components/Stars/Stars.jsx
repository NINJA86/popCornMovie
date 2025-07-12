import React, { useState } from 'react';
import Star from '../StartRating/Star';
import { useStar } from '../../hook/useStar';

// function Stars({ setHasRated }) {
//   const { rate, setRate } = useStar();
//   return (
//     <div className="" onClick={() => setHasRated(true)}>
//       {Array.from({ length: 10 }, (_, i) => (
//         <Star key={i} isFilled={rate > i} onRate={setRate} rate={i} />
//       ))}
//       <span>{rate}</span>
//     </div>
//   );
// }
function Stars({ setHasRated }) {
  const { rate, setRate } = useStar();

  return (
    <div onClick={() => setHasRated(true)}>
      {Array.from({ length: 10 }, (_, i) => (
        <Star key={i} index={i} isFilled={rate > i} onRate={setRate} />
      ))}
      <span>{rate}</span>
    </div>
  );
}

export default Stars;
