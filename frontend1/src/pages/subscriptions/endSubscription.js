import React from "react";

import { SubscriptionContextProvider } from "./context/subscription-context"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area";
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar";
import ScreenDashSubscriptionSidebar from "./subscription-sidebar";
import EndSubscription from "./end-Subscription";
import './subscription.scss';

const ScreenDashEndSubscription = () => {
  return (
    <SubscriptionContextProvider>
      <WrapperMainContentArea>
        <EndSubscription />
      </WrapperMainContentArea>
      <WrapperMainContentSidebar className="subscription-sidebar">
        <ScreenDashSubscriptionSidebar />
      </WrapperMainContentSidebar>
    </SubscriptionContextProvider>
  )
}
export default ScreenDashEndSubscription