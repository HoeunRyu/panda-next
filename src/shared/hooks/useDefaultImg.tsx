import { useEffect, useState } from "react";

interface UseDefaultImgReturn {
  handleImgErr: () => void;
  imgSrc: string;
}

const isValidUrl = (urlString: string): boolean => {
  try {
    // 상대 경로(/로 시작하는)인 경우 유효한 것으로 처리
    if (urlString.startsWith("/")) {
      return true;
    }
    // URL 객체 생성 시도
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

export function useDefaultImg(
  src: string | null | undefined,
  defaultImgSrc: string
): UseDefaultImgReturn {
  const [imgSrc, setImgSrc] = useState<string>(defaultImgSrc);

  useEffect(() => {
    if (!src) {
      setImgSrc(defaultImgSrc);
      return;
    }

    // URL 유효성 검사
    if (isValidUrl(src)) {
      setImgSrc(src);
    } else {
      setImgSrc(defaultImgSrc);
    }
  }, [src, defaultImgSrc]);

  const handleImgErr = (): void => setImgSrc(defaultImgSrc);

  return {
    handleImgErr,
    imgSrc,
  };
}
