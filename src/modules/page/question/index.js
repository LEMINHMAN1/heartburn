import Question from "modules/components/question";
import React from "react";
import "./stylesheet.scss";

const Comp = () => {
  return (
    <Question onSubmit={()=>{alert('Submited')}}/>
  )
};


export default Comp;
