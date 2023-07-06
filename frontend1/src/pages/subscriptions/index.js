import React from "react";

import { SubscriptionContextProvider } from "./context/subscription-context"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area";
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar";
import ScreenDashSubscriptionSidebar from "./subscription-sidebar";
import ScreenDashSubscriptionMain from "./subscription-main";
import './subscription.scss';

const ScreenDashSubscriptions = () => {
  return (
    <SubscriptionContextProvider>
    <WrapperMainContentArea>
      <ScreenDashSubscriptionMain />
    </WrapperMainContentArea>
    <WrapperMainContentSidebar className="subscription-sidebar">
      <ScreenDashSubscriptionSidebar />
    </WrapperMainContentSidebar>
  </SubscriptionContextProvider>
  )
}
export default ScreenDashSubscriptions