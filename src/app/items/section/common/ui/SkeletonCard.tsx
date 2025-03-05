import "./SkeletonCard.css";

export function SkeletonCard() {
  return (
    <div className="item-card">
      <img
        className="item-img"
        src={"assets/default_item.png"}
        alt="로딩중 이미지"
      />

      <div className="skeleton-card-text">
        <div className="skeleton-name" />
        <div className="skeleton-price" />
        <div className="skeleton-fav" />
      </div>
    </div>
  );
}
