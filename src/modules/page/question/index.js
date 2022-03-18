import Question from "modules/components/question";
import React from "react";

const Comp = () => {
  return (
    <Question onSubmit={()=>{alert('Submited')}}/>
  )
};


export default Comp;
