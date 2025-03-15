import { useResponseSort } from "@/shared/hooks/responseSortHook";
import { ORDER_BY } from "../../common/services/getItemsListAPI";
import { useMediaQuery } from "@/shared/hooks/mediaQueryHook";
import { OrderByItem, ScreenSizeType } from "@/shared/type";
import React from "react";

//ORDER_BY의 값만 배열로 가져오기
const ORDER_BY_VALUE_ARR: OrderByItem[] = Object.values(ORDER_BY);

interface SortItemsProps {
  onSortChange: (sort: string) => void;
}

export const SortItems: React.FC<SortItemsProps> = ({ onSortChange }) => {
  const screenSize: ScreenSizeType = useMediaQuery();
  const { selectedName, showDropdown, handleSelectSort, toggleDropdown } =
    useResponseSort(ORDER_BY.RECENT); //초기값은 "최신순"으로 설정

  const dropdownMenuClassName: string = showDropdown ? "show" : "";
  const sortItemsLabelClassName: string =
    screenSize === "MOBILE" ? "mobile" : "";
  const sortItemsIcon: string =
    screenSize === "MOBILE"
      ? "assets/mobile_sort_icon.png"
      : "assets/sort_icon.png";

  //console.log("선택한 메뉴 이름", selectedName);
  //console.log("선택한 정렬 기준", selectedValue);
  //console.log("--------");

  return (
    <div
      id="sort-items-wrapper"
      className={"text-lg reguar"}
      onClick={toggleDropdown}
    >
      {screenSize !== "MOBILE" && (
        <p className={`sort-items-label ${sortItemsLabelClassName}`}>
          {selectedName}
        </p>
      )}
      <img id="dropdown-icon" src={sortItemsIcon} alt="정렬 아이콘" />

      <div className={`dropdown-menu ${dropdownMenuClassName}`}>
        {ORDER_BY_VALUE_ARR.map((item) => (
          <p
            className="dropdown-option"
            onClick={() => {
              handleSelectSort(item);
              onSortChange(item.value); //sort 파라미터 업데이트
            }}
            key={item.value}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};
