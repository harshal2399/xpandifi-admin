import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import CampaignRequest from "../pages/CampaignRequest";
import BidReview from "../pages/BidReview";
import RevenuePayouts from "../pages/RevenuePayouts";
import DeviceManagement from "../pages/DeviceManagement";
import Setting from "../pages/Setting";

export const dashboardRoutes = [
  <Route
    key="layout"
    element={
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    }
  >
    {/* <Route index path="/" element={<Home />} /> */}
    <Route path="/" element={<Dashboard />} />
    <Route path="/user-management" element = {<UserManagement />} />
    <Route path="/campaign-request" element={<CampaignRequest />} />
    <Route path="/bids" element={<BidReview />} />
    <Route path="/revenue-payouts" element={<RevenuePayouts />} />
    <Route path="/device-management" element={<DeviceManagement />} />
    <Route path="/setting" element={<Setting />} />
   </Route>,
];
