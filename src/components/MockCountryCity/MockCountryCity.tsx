import { useState } from "react";

export default function MockCountryCity() {

  const generateOutput = () => {
    return "This is javascript code".split(" ").map(str=>str.split("").reverse().join("")).join(" ");
  };

  return (
    <>
      <hr />
      <hr />

      {generateOutput()}
    </>
  );
}
