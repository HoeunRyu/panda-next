"use client";

import "./RegistrationItemsPage.css";
import { RegItemInput } from "./ui/RegItemInput";
import { Typo } from "../../shared/Typo/Typo";
import { TagWithClose } from "./ui/TagWithClose";
import { useRegItem } from "./hooks/regItemHook";
import { colorChips } from "@/shared/styles/colorChips";
import React from "react";

export default function Page(): React.ReactElement {
  const {
    body,
    deleteTag,
    isInputValid,
    usePostItem,
    isFormDisabled,
    inputFields,
  } = useRegItem();

  return (
    <div className="content" id="registration-items-page">
      <div className="section-top">
        <Typo
          className={"text20Bold"}
          content="상품 등록하기"
          color={colorChips.gray800}
        />
        <button
          id="reg-btn"
          className={`${"text-lg semibold"} ${
            !isFormDisabled() ? "active" : ""
          }`}
          disabled={isFormDisabled()}
          onClick={usePostItem}
        >
          등록
        </button>
      </div>

      <div className="section-main">
        <div className="input-container">
          {inputFields.map((field) => (
            <RegItemInput
              key={field.field}
              field={field.field}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              onInput={field.onInput}
              isError={isInputValid(field.field).isError}
              errMsg={isInputValid(field.field).errMsg}
            />
          ))}
        </div>
        <div className="tag-chip-wrapper">
          {body.tags.map((tag) => (
            <TagWithClose tag={tag} deleteTag={deleteTag} key={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
