import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CircularProgress from "@mui/material/CircularProgress";

function CardUpcomingBill(props) {
  const { data } = props;

  const getBillIcon = (logoName) => {
    const name = logoName?.split(".")[0]?.toLowerCase();
    switch (name) {
      case "figma":
        return <Icon.Figma />;
      case "adobe":
        return <Icon.Adobe />;
      default:
        return <Icon.Other />;
    }
  };

  const cardData = (
    <div className="flex flex-col justify-around h-full">
      {data.map((item) => (
        <div key={item.id} className="flex justify-between">
          <div className="flex items-center">
            <div className="bg-special-bg p-4 rounded-lg flex flex-col text-center">
              <span className="text-xs">{item.month}</span>
              <span className="text-2xl font-bold">{item.date}</span>
            </div>
            <div className="ms-10">
              <div className="[&>svg]:w-17 [&>svg]:h-8">
                {getBillIcon(item.logo)}
              </div>
              <span className="font-bold block mt-2">{item.name}</span>
              <span className="text-xs text-gray-400 block mt-1">
                Last Charge - {item.lastCharge}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold">
              ${item.amount}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <>
      <Card
        title="Bills"
        desc={
          Object.keys(data).length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              Loading Data
            </div>
          ) : (
            cardData
          )
        }
      />
    </>
  );
}

export default CardUpcomingBill;