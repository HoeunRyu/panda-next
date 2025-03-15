// import searchIcon from "public/assets/search_icon.png";
import React from "react";
import { useSearchStore } from "@/app/items/section/common/hooks/useSearchStore";

interface SearchItemsProps {
  onSearch: (keyword: string) => void;
}

export const SearchItems: React.FC<SearchItemsProps> = ({ onSearch }) => {
  const { params } = useSearchStore();
  const [inputValue, setInputValue] = React.useState(params.keyword || "");

  // params.keyword가 변경될 때 input 값 업데이트
  React.useEffect(() => {
    setInputValue(params.keyword || "");
  }, [params.keyword]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim();
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const target = e.currentTarget;

    if (e.key === "Enter") {
      const value = target.value.trim();
      onSearch(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div id="search-items-wrapper">
      <input
        id="input-search-keyword"
        className={"text-lg regular"}
        name="keyword"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="검색할 상품을 입력해주세요"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <img
        id="item-search-icon"
        src={"assets/search_icon.png"}
        alt="돋보기 아이콘"
      />
    </div>
  );
};
