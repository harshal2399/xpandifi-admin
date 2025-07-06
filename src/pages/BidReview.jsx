// src/pages/bid/BidReview.jsx
import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ReusableTable from "../components/table/ReusableTable";

const BidReview = () => {
    const { campaigns, loading } = useSelector((state) => state.campaign);
  
  console.log(campaigns);
  const columns = [
    {
      id: "campaignName",
      label: "Campaign",
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.image}
            alt="campaign"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium">{row.campaignName}</span>
        </div>
      ),
    },
    { id: "brandName", label: "Ad Agency" },
    {
      id: "bidAmount",
      label: "Bid Amount",
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
      id: "slotDetails",
      label: "Slot Details",
      render: (row) => `${row.startTime} – ${row.endTime}`,
    },
  ];

  return (
    <div className="p-6">
      <Typography variant="h5" fontWeight={600} mb={3}>
        Bid Review
      </Typography>

      <ReusableTable columns={columns} rows={campaigns} loading={false} />
    </div>
  );
};

export default BidReview;
