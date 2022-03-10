import React from "react";
import Calculate from "../../Analysis/Calculate/Calculate";

const body = (props) => {
  //console.log(Calculate.props);

  return (
    <div>
      <Calculate page={props.page}></Calculate>
    </div>
  );
};

export default body;
