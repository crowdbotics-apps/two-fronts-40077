import React from "react";

import { SubscriptionContextProvider } from "./context/subscription-context"
import WrapperMainContentArea from "../../components/wrappers/dashboard/main-content-area";
import WrapperMainContentSidebar from "../../components/wrappers/dashboard/main-content-sidebar";
import ScreenDashSubscriptionSidebar from "./subscription-sidebar";
import './subscription.scss';
import SubscriptionEditPayment from "./subscriptionEditPayment";

const ScreenEditPayment = () => {
  return (
    <SubscriptionContextProvider>
      <WrapperMainContentArea>
        <SubscriptionEditPayment />
      </WrapperMainContentArea>
      <WrapperMainContentSidebar className="subscription-sidebar">
        <ScreenDashSubscriptionSidebar />
      </WrapperMainContentSidebar>
    </SubscriptionContextProvider>
  )
}
export default ScreenEditPayment