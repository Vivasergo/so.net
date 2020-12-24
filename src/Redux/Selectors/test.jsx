import React, { useEffect, useState } from "react";

export const Test = () => {
  const [numb, setNumb] = useState(0);


  useEffect(() => {
    setNumb((prevVal) => {
      return prevVal
    });
  }, [numb]);

  return (
    <div>
      <p>Hi {numb}</p>
    </div>
  );
};
