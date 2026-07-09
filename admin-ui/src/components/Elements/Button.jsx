import React from "react";

function Button(props) {
  const { children, type = "submit", variant = "primary", onClick } = props;
  const baseClass = "h-12 rounded-md text-sm w-full transition-all cursor-pointer hover:scale-105";
  const variantClasses = {
    primary: "bg-btn-primary text-text-btn-primary font-bold",
    secondary: "bg-[#e8e8e8] text-[#191919] font-medium",
  };
  const finalClasses = `${baseClass} ${
    variantClasses[variant] || variantClasses.primary
  }`;

  return (
    <button className={finalClasses} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;