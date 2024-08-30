import React from "react";
import { SearchDialog } from "./search/search-dialog";
import { ChatbotSheetSide } from "./chatbot-sheet-side";
import { CartSheetSide } from "./cart/cart-sheet-side";
import { NavSheetSide } from "./nav-sheet-side";

const NavbarMobile = () => {
  return (
    <div className="fixed md:hidden bottom-0 bg-primary-foreground dark:bg-secondary left-0 right-0 py-2 grid grid-cols-4 gap-4 justify-items-center items-center">
      <SearchDialog />

      <div className="inline-flex md:hidden">
        <NavSheetSide side="left" />
      </div>
      <div className="inline-flex md:hidden">
        <ChatbotSheetSide side="bottom" />
      </div>
      <div className="inline-flex md:hidden">
        <CartSheetSide side="right" />
      </div>
    </div>
  );
};

export default NavbarMobile;
