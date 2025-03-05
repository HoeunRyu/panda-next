export type ValidKey = "name" | "description" | "price" | "tagInput";

export interface InputCommonProps {
  className: string;
  placeholder: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export interface RegItemInputFields {
  label: string;
  placeholder: string;
  type: string;
  field: ValidKey;
  onInput: (value: string) => void;
}

export interface RegItemInputProps extends RegItemInputFields {
  key: string;
  isError: boolean;
  errMsg: string;
}

export interface TagWithCloseProps {
  tag: string;
  deleteTag: (clickedTag: string) => void;
}
