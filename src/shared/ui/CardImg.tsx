import { useEffect, useState } from "react";

interface CardImgProps {
  className: string;
  src: string;
  defaultImg: string;
  alt: string;
}

export function CardImg({ className, src, defaultImg, alt }: CardImgProps) {
  const [imgErr, setImgErr] = useState<boolean>(false);

  //이미지 url이 변경될 때마다(각 카드마다) 상태 초기화
  useEffect(() => {
    setImgErr(false);
  }, [src]);

  //이미지 로드 실패 시 디폴트 이미지로 전환
  const handleImgErr = (): void => setImgErr(true);

  //imgErr이 true이거나 src가 아예 없는 경우 디폴트이미지, 정상 url인 경우 src 사용
  const imgSrc: string = imgErr || !src ? defaultImg : src;

  return (
    <img className={className} src={imgSrc} alt={alt} onError={handleImgErr} />
  );
}
