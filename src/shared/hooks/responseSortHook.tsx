import { useState } from "react";
import { OrderByItem } from "../type";

interface UseResponseSortOutput {
  selectedName: string;
  showDropdown: boolean;
  handleSelectSort: (item: OrderByItem) => void;
  toggleDropdown: () => void;
}

export function useResponseSort(initValue: OrderByItem): UseResponseSortOutput {
  //초기값은 최신순으로 설정
  const [selectedName, setSelectedName] = useState<string>(initValue.name);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  /**
   * @description 클릭된 옵션의 이름으로 #sort-items-label ui업데이트
   */
  const handleSelectSort = (item: OrderByItem): void => {
    setSelectedName(item.name);
  };

  const toggleDropdown = (): void => {
    setShowDropdown((prev) => !prev);
  };

  return {
    selectedName,
    showDropdown,
    handleSelectSort,
    toggleDropdown,
  };
}
