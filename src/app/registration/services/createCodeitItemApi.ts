import { codeitInstance } from "@/shared/service/codeit/codeitInstance";
import { CodeitProduct } from "@/shared/types/codeitApiType";
import { AxiosError, AxiosResponse } from "axios";

export interface PostCodeitProductApiParams {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images?: string[];
}

export const postCodeitProductAPI = async ({
  name,
  description,
  price,
  tags,
  images,
}: PostCodeitProductApiParams): Promise<CodeitProduct> => {
  try {
    const response: AxiosResponse<CodeitProduct> = await codeitInstance.post(
      "/products",
      { name, description, price, tags, images }
    );
    return response.data;
  } catch (err: any) {
    if (err?.response?.data) {
      return err.response.data;
    }
    throw err;
  }
};
