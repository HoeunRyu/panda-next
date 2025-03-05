// import searchIcon from "public/assets/search_icon.png";
import React from "react";

interface SearchItemsProps {
  onSearch: (keyword: string) => void;
}

export const SearchItems: React.FC<SearchItemsProps> = ({ onSearch }) => {
  //입력받은 키워드 상위 컴포넌트에 전달해 파라미터 업데이트
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

  return (
    <div id="search-items-wrapper">
      <input
        id="input-search-keyword"
        className={"text-lg regular"}
        name="keyword"
        type="text"
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
