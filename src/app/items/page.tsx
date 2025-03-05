"use client";

import { BestItems } from "./section/BestItems/BestItems";
import { OnSaleItems } from "./section/OnSaleItems/OnSaleItems";

export default function Page() {
  return (
    <div className="content" id="items-page">
      <BestItems />
      <OnSaleItems />
    </div>
  );
}
