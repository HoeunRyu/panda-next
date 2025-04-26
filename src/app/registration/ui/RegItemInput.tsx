"use client";

import "./RegItemInput.css";
import { Typo } from "@/shared/Typo/Typo";
import React, { useRef } from "react";
import { colorChips } from "@/shared/styles/colorChips";
import { InputCommonProps, RegItemInputProps } from "../type";

export const RegItemInput: React.FC<RegItemInputProps> = ({
  label,
  placeholder,
  type,
  onInput,
  isError,
  errMsg,
}) => {
  //엔터키 입력 상태 ref로 관리
  const enterPressRef = useRef<boolean>(false);
  const errInputBoxClassName: string = isError ? "error" : "";
  const errMsgClassName: string = isError ? "show" : "";

  //input에 입력받은 내용 상위 컴포넌트에 전달하고 body 업데이트
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!enterPressRef.current) {
      //enter키다운으로 blur되면 handleBlur가 중복 실행되지 않도록 제외함
      //-> 마우스 클릭, Tab키로 포커스 아웃시 실행
      const value = e.target.value.trim();
      // console.log("블러이벤트발생!: ", value);

      onInput(value);
      //input값 저장 후, 태그 input일 때만 input값 초기화해주기.
      if (label === "태그") {
        e.target.value = "";
      }
    }
    enterPressRef.current = false; // blur이벤트 처리 후 enter상태 초기화
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const target = e.currentTarget;

    if (e.key === "Enter") {
      enterPressRef.current = true;
      target.blur();
      const value = target.value.trim();
      // console.log("키다운이벤트발생!: ", value);

      onInput(value);
      if (label === "태그") {
        target.value = "";
      }
    }
  };

  //input 공통 props
  const commonProps: InputCommonProps = {
    className: `${
      type === "textarea" ? "textarea-box" : "input-box"
    } ${errInputBoxClassName} text-lg regular`,
    placeholder,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
  };

  return (
    <div className="input-wrapper">
      <Typo
        className={"text18Bold"}
        content={label}
        color={colorChips.gray800}
      />

      {type === "textarea" ? (
        <textarea {...commonProps} />
      ) : (
        <input {...commonProps} type={type} />
      )}

      {errMsg && (
        <p className={`err-text text-lg semibold ${errMsgClassName}`}>
          {errMsg}
        </p>
      )}
    </div>
  );
};
