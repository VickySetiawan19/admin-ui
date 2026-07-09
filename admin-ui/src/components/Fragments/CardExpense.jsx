import React from "react";
import Icon from "../Elements/Icon";

function CardExpense(props) {
  const { category, amount, percentage, trend, detail = [] } = props;

  const getIcon = (cat) => {
    switch (cat?.toLowerCase()) {
      case "housing":
        return <Icon.House />;
      case "food":
        return <Icon.Food />;
      case "transportation":
        return <Icon.Transport />;
      case "entertainment":
        return <Icon.Movie />;
      case "shopping":
        return <Icon.Shopping />;
      default:
        return <Icon.Other />;
    }
  };

  return (
    <div className="bg-white rounded-md overflow-hidden flex flex-col">
      {/* 1. Bagian Atas: Header Gray Area */}
      <div className="bg-gray-06 p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-05 rounded-lg flex items-center justify-center text-gray-500 [&>svg]:w-5 [&>svg]:h-5">
            {getIcon(category)}
          </div>
          <div>
            <span className="text-gray-03 font-bold text-xs sm:text-sm capitalize block">
              {category}
            </span>
            <span className="text-lg font-bold text-defaultBlack block -mt-0.5">
              ${amount}
            </span>
          </div>
        </div>

        {/* Tren Persentase & Keterangan */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 font-bold text-sm text-gray-03">
            <span>{percentage}%</span>
            <div
              className={`[&>svg]:w-4 [&>svg]:h-4 ${trend === "up" ? "text-red-500" : "text-green-500"}`}
            >
              {trend === "up" ? <Icon.ArrowUp /> : <Icon.ArrowDown />}
            </div>
          </div>
          <p className="text-gray-03 text-[10px] mt-0.5">
            Compare to the last month
          </p>
        </div>
      </div>

      {/* 2. Bagian Bawah: Meng-loop Seluruh Item Detail */}
      <div className="p-4 flex-1 flex flex-col justify-center gap-4">
        {Array.isArray(detail) && detail.length > 0 ? (
          detail.map((itemObj, index) => (
            <div key={index} className="w-full">
              {/* Item Layout */}
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-gray-01">
                  {itemObj.item}
                </span>
                <div className="flex flex-col gap-1 items-end justify-center">
                  <span className="font-bold text-gray-03">
                    ${itemObj.amount}
                  </span>
                  <span className="text-xs text-gray-01">{itemObj.date}</span>
                </div>
              </div>

              {/* Garis pemisah antar item (jangan tampilkan di item terakhir) */}
              {index < detail.length - 1 && (
                <hr className="border-gray-05 mt-4" />
              )}
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-400 italic text-center py-2">
            No recent items
          </p>
        )}
      </div>
    </div>
  );
}

export default CardExpense;