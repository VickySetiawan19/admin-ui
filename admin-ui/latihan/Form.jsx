import React from "react";

const Form = () => {
  return (
    <div className="p-4">
      <form>
        Email :<input type="text" id="email" name="email" className="border" />
        <br />
        Password :
        <input type="text" id="password" name="password" className="border" />
      </form>
    </div>
  );
};

export default Form;