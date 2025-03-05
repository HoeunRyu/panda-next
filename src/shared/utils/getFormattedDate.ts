export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export const getRelativeTimeString = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 1분 미만
  if (diffInSeconds < 60) {
    return "방금 전";
  }

  // 1시간 미만
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  // 24시간 미만
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  // 7일 미만
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}일 전`;
  }

  // 30일 미만
  if (days < 30) {
    return `${Math.floor(days / 7)}주 전`;
  }

  // 12개월 미만
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}개월 전`;
  }

  // 1년 이상
  const years = Math.floor(months / 12);
  return `${years}년 전`;
};
