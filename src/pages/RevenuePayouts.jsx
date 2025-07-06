import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ReusableTable from "../components/table/ReusableTable";
import moment from "moment";

const RevenuePayouts = () => {
  const { campaigns, loading } = useSelector((state) => state.campaign);
  console.log(campaigns);
  const columns = [
   {
  id: "date",
  label: "Date",
  render: (row) => (
    <span>{moment(row.endDate).format("DD/MM/YYYY")}</span>
  ),
},
    {
      id: "campaignName",
      label: "Campaign",
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.image || "/default.png"}
            alt="campaign"
            className="w-6 h-6 rounded-full"
          />
          <span>{row.campaignName}</span>
        </div>
      ),
    },
    {
      id: "bidAmount",
      label: "Amount",
      numeric: true,
      render: (row) => `₹ ${row.baseBid}`,
    },
    {
      id: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            row.status === "APPROVED"
              ? "bg-green-100 text-green-700"
              : row.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isApproved}
        </span>
      ),
    },
    {
      id: "archived",
      label: "Archived",
      render: () => {
        const randomPercentage = Math.floor(Math.random() * 51) + 50; // 50% to 100%
        return (
          <span className="text-gray-600 font-medium">{randomPercentage}%</span>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <Typography variant="h5" fontWeight={600} mb={3}>
        Revenue & Payouts
      </Typography>

      <ReusableTable columns={columns} rows={campaigns} loading={loading} />
    </div>
  );
};

export default RevenuePayouts;
