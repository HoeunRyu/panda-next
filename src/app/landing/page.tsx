import "./LandingPage.css";
import { MAIN_CARD_CONTENTS } from "./utils/constatns";
import { LandingMainCards } from "./ui/LandingMainCards";
import Link from "next/link";
import React from "react";

export default function page(): React.ReactElement {
  return (
    <div id="landing-page">
      <div className="bg-colored">
        <div id="top-box" className="container">
          <div className="msg-box">
            <div className="landing-title-box">
              <span className="landing-title">일상의 모든 물건을 </span>
              <span className="landing-title">거래해 보세요</span>
            </div>
            <Link id="items-btn" href="/items">
              구경하러 가기
            </Link>
          </div>
          <img
            className="panda-img"
            src={"/assets/home_top_img.png"}
            alt="랜딩 페이지 이미지"
          />
        </div>
      </div>

      <div className="landing-main">
        {MAIN_CARD_CONTENTS.map((card) => (
          <LandingMainCards key={card.badge} {...card} />
        ))}
      </div>

      <div className="bg-colored bottom">
        <div id="bottom-box" className="container">
          <div className="msg-box">
            <div className="landing-title-box">
              <p className="landing-title">믿을 수 있는</p>
              <p className="landing-title">판다마켓 중고거래</p>
            </div>
          </div>
          <img
            className="panda-img"
            src={"/assets/home_bottom_img.png"}
            alt="랜딩 페이지 이미지"
          />
        </div>
      </div>
    </div>
  );
}
