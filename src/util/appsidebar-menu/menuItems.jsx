import {
  GridIcon,
  UserMgntIcon,
  CampaignReqIcon,
  BidReviewIcon,
  RevenuePayIcon,
  DeviceMgntIcon,
  SettingIcon,
} from "../../icon/index";

export const menuItems = [
  { name: "Dashboard", icon: <GridIcon />, path: "/" },
  { name: "User Management", icon: <UserMgntIcon />, path: "/user-management" },
  {
    name: "Campaign Request",
    icon: <CampaignReqIcon />,
    path: "/campaign-request",
  },
  { name: "Bid Review", icon: <BidReviewIcon />, path: "/bids" },
  {
    name: "Revenue & Payouts",
    icon: <RevenuePayIcon />,
    path: "/revenue-payouts",
  },
  {
    name: "Device Management",
    icon: <DeviceMgntIcon />,
    path: "/device-management",
  },
  { name: "Setting", icon: <SettingIcon />, path: "/setting" },
];
