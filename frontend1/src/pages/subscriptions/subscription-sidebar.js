import React, { useEffect, useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { ALLICONS } from "../../assets"
import { useNavigate } from "react-router-dom"
import { useSubscriptionContext } from "./context/subscription-context"

const ScreenDashSubscriptionSidebar = () => {
  const navigate = useNavigate();
  const { userSubDetails, refetchUserSubDetails } = useSubscriptionContext()
  const [userSubData, setUserSubData] = useState()

  useEffect(() => {
    refetchUserSubDetails()
  }, [])

  useEffect(() => {
    if(userSubDetails){
      setUserSubData(userSubDetails?.data)
    }
  }, [userSubDetails])

  const endSubscription = () => {
    navigate("/dashboard/end-subscription");
  };

  return (
    <>
      <div className="container text-start">
        <div className="col">
          <div className="row p-1">
            <div className="avatar">
            {userSubData?.high_school?.school_image ? <img src={userSubData?.high_school?.school_image} width={50} height={50} style={{borderRadius: "50%", objectFit: "cover"}}/> : <ALLICONS.Home className="cursor-pointer" />}
            </div>
          </div>
          <div className="row p-1">
            <div className="col-10 fw-semibold">{userSubData?.high_school?.school_name || "NA"}</div>
          </div>
          <div className="row p-1">
            <div className="col-8">Organization created:</div>
            <div className="col-4">{userSubData?.high_school?.organization_created || "NA"}</div>
          </div>
          <div className="row p-1">
            <div className="col-8">Subscription created:</div>
            <div className="col-4">{userSubData?.high_school?.subscription_started || "NA"}</div>
          </div>
          <div className="row p-1">
          <div
            className="col"
            style={{ color: "#B71632", cursor: "pointer" }}
            onClick={endSubscription}
          >
            End Subscription now
          </div>
          </div>
        </div>
        <br />
        <div className="col">
          <div className="row">
            <div className="col-10 fw-bolder">Subscription usage</div>
          </div>
          <div className="row p-1">
            <div className="col-8">
              Productions:
            </div>
            <div className="col-4">{userSubData?.subscription_usage?.productions || "NA"}</div>
          </div>
          <div className="row p-1">
            <div className="col-8">Teachers use:</div>
            <div className="col-4">{userSubData?.subscription_usage?.teacher_use || "NA"}</div>
          </div>
        </div>
        <br />
        <div className="col">
          <div className="row">
            <div className="col-5 fw-bold">Payment method</div>
          </div>
          <div className="row p-1">
            <div className="col-6">Card used:</div>
            <div className="col-6">{userSubData?.payment_method?.card_used ? `xxxx-xxxx-xxxx-${userSubData?.payment_method?.card_used}` : "NA"}</div>
          </div>
          <div className="row p-1">
            <div className="col-8">Next billing date:</div>
            <div className="col-4">{userSubData?.payment_method?.next_billing_date || "NA"}</div>
          </div>
          <div className="row p-1">
            <div className="col-8">Next billing amount:</div>
            <div className="col-4">{userSubData?.payment_method?.next_billing_amount ? `$${userSubData?.payment_method?.next_billing_amount}` : "NA"}</div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ScreenDashSubscriptionSidebar
