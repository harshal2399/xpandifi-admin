import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCampaigns,
  campaignApproval,
} from "../redux/slices/campaignSlice";
import { Modal } from "../components/ui/modal/Modal";
import ReusableTable from "../components/table/ReusableTable";

const CampaignRequest = () => {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.campaign);

  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionRemark, setRejectionRemark] = useState("");

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleRowClick = (campaign) => {
    setSelectedCampaign(campaign);
    setIsOpen(true);
  };

const handleApproval = (status, remark = "") => {
  if (!selectedCampaign) return;

  const payload = {
    id: selectedCampaign.id,
    status: status === "REJECTED" ? "REJECT" : "APPROVE",
    remark: status === "REJECTED" ? remark : undefined,
  };

  // Close modals immediately
  setIsOpen(false);
  setIsRejectModalOpen(false);
  setRejectionRemark("");

  // Trigger Redux async thunk (state updates immediately via reducer)
  dispatch(campaignApproval(payload));
};


  const openRejectModal = () => {
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectionRemark("");
  };

  const columns = [
    {
      id: "campaignName",
      label: "Campaign Name",
      render: (row) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleRowClick(row)}
        >
          <img
            src={row?.image || "/default.png"}
            alt="campaign"
            className="w-6 h-6 rounded-full"
          />
          <span>{row.campaignName}</span>
        </div>
      ),
    },
    {
      id: "brandName",
      label: "Brand Name",
    },
    {
      id: "schedule",
      label: "Schedule",
      render: (row) =>
        row.startTime && row.endTime
          ? `${row.startTime} - ${row.endTime}`
          : "N/A",
    },
    { id: "adType", label: "Ad Type" },
    {
      id: "baseBid",
      label: "Budget",
      render: (row) => `₹ ${row.baseBid} /-`,
    },
    {
      id: "isApproved",
      label: "Approval",
      render: (row) => {
        if (row.isApproved === "PENDING") {
          return (
            <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
              Pending
            </button>
          );
        } else if (row.isApproved === "APPROVED") {
          return (
            <button className="bg-green-100 text-green-700 px-3 py-1 rounded">
              Approved
            </button>
          );
        } else if (row.isApproved === "REJECTED") {
          return (
            <button className="bg-red-100 text-red-700 px-3 py-1 rounded">
              Rejected
            </button>
          );
        } else {
          return <span className="text-gray-400">Unknown</span>;
        }
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Campaign Requests</h2>
      </div>

      <div className="mt-4">
        <ReusableTable columns={columns} rows={campaigns} loading={loading} />
      </div>

      {/* Campaign Details Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="lg"
        showCloseButton={true}
      >
        {selectedCampaign && (
          <div className="p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>

            {selectedCampaign.image && (
              <div className="w-full h-48 mb-4">
                <img
                  src={selectedCampaign.image}
                  alt="Campaign"
                  className="w-full h-full object-cover rounded-lg shadow"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Name:</strong> {selectedCampaign.campaignName}
              </div>
              <div>
                <strong>Brand:</strong> {selectedCampaign.brandName}
              </div>
              <div>
                <strong>Schedule:</strong>{" "}
                {selectedCampaign.startDate?.slice(0, 10)} (
                {selectedCampaign.startTime}) →{" "}
                {selectedCampaign.endDate?.slice(0, 10)} (
                {selectedCampaign.endTime})
              </div>
              <div>
                <strong>Ad Type:</strong> {selectedCampaign.adType}
              </div>
              <div>
                <strong>Store Type:</strong> {selectedCampaign.storeType}
              </div>
              <div>
                <strong>Product Type:</strong> {selectedCampaign.productType}
              </div>
              <div>
                <strong>Budget:</strong> {selectedCampaign.campaignBudget}
              </div>
              <div>
                <strong>Base Bid:</strong> ₹ {selectedCampaign.baseBid}
              </div>
              <div>
                <strong>Max Bid:</strong> {selectedCampaign.maxBid}
              </div>
              <div>
                <strong>Targeting:</strong> {selectedCampaign.targeting}
              </div>
              <div>
                <strong>Status:</strong> {selectedCampaign.isApproved}
              </div>
              <div>
                <strong>Progress:</strong> {selectedCampaign.achieveStatus}
              </div>
              <div>
                <strong>Duration:</strong> {selectedCampaign.duration} sec
              </div>
              <div>
                <strong>Created At:</strong>{" "}
                {new Date(selectedCampaign.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Updated At:</strong>{" "}
                {new Date(selectedCampaign.updatedAt).toLocaleString()}
              </div>
            </div>

            {selectedCampaign.isApproved === "PENDING" && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  onClick={() => handleApproval("APPROVE")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  onClick={openRejectModal}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={closeRejectModal}
        size="md"
        showCloseButton={true}
      >
        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold">Reject Campaign</h3>
          <textarea
            value={rejectionRemark}
            onChange={(e) => setRejectionRemark(e.target.value)}
            placeholder="Reason for rejection..."
            className="w-full h-24 p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={closeRejectModal}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 text-white rounded ${
                rejectionRemark.trim()
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-red-300 cursor-not-allowed"
              }`}
              onClick={() => handleApproval("REJECTED", rejectionRemark)}
              disabled={!rejectionRemark.trim()}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CampaignRequest;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCampaigns,
//   campaignApproval,
// } from "../redux/slices/campaignSlice";
// import { Modal } from "../components/ui/modal/Modal";
// import ReusableTable from "../components/table/ReusableTable";

// const CampaignRequest = () => {
//   const dispatch = useDispatch();
//   const { campaigns, loading } = useSelector((state) => state.campaign);

//   const [selectedCampaign, setSelectedCampaign] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
//   const [rejectionRemark, setRejectionRemark] = useState("");

//   useEffect(() => {
//     dispatch(fetchCampaigns());
//   }, [dispatch]);

//   const handleRowClick = (campaign) => {
//     setSelectedCampaign(campaign);
//     setIsOpen(true);
//   };

//   const handleApproval = (status, remark = "") => {
//     if (!selectedCampaign) return;

//     const payload = {
//       id: selectedCampaign.id,
//       status: status === "REJECTED" ? "REJECT" : "APPROVE",
//       remark: status === "REJECTED" ? remark : undefined,
//     };

//     dispatch(campaignApproval(payload));
//     setIsOpen(false);
//     setIsRejectModalOpen(false);
//     setRejectionRemark("");
//   };

//   const openRejectModal = () => {
//     setIsRejectModalOpen(true);
//   };

//   const closeRejectModal = () => {
//     setIsRejectModalOpen(false);
//     setRejectionRemark("");
//   };

//   const columns = [
//     {
//       id: "name",
//       label: "Campaign Name",
//       render: (row) => (
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => handleRowClick(row)}
//         >
//           <img
//             src={row?.image || "/default.png"}
//             alt="campaign"
//             className="w-6 h-6 rounded-full"
//           />
//           <span>{row.campaignName}</span>
//         </div>
//       ),
//     },
//     {
//       id: "brand",
//       label: "Brand Name",
//       render: (row) => row.brandName || "N/A",
//     },
//     {
//       id: "schedule",
//       label: "Schedule",
//       render: (row) =>
//         row.startTime && row.endTime
//           ? `${row.startTime} - ${row.endTime}`
//           : "N/A",
//     },
//     { id: "type", label: "Ad Type", render: (row) => row.adType || "N/A" },
//     { id: "budget", label: "Budget", render: (row) => `₹ ${row.baseBid} /-` },
//     {
//       id: "approval",
//       label: "Approval",
//       render: (row) => {
//         if (row.isApproved === "PENDING") {
//           return (
//             <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">
//               Pending
//             </button>
//           );
//         } else if (row.isApproved === "APPROVED") {
//           return (
//             <button className="bg-green-100 text-green-700 px-3 py-1 rounded">
//               Approved
//             </button>
//           );
//         } else if (row.isApproved === "REJECTED") {
//           return (
//             <button className="bg-red-100 text-red-700 px-3 py-1 rounded">
//               Rejected
//             </button>
//           );
//         } else {
//           return <span className="text-gray-400">Unknown</span>;
//         }
//       },
//     },
//   ];

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Campaign Requests</h2>
//       </div>

//       <div className="mt-4">
//         <ReusableTable columns={columns} rows={campaigns} loading={loading} />
//       </div>

//       {/* Campaign Details Modal */}
//       <Modal
//         isOpen={isOpen}
//         onClose={() => setIsOpen(false)}
//         size="lg"
//         showCloseButton={true}
//       >
//         {selectedCampaign && (
//           <div className="p-4 space-y-4">
//             <h2 className="text-xl font-semibold mb-4">Campaign Details</h2>
//             {selectedCampaign.image && (
//               <div className="w-full h-48 mb-4">
//                 <img
//                   src={selectedCampaign.image}
//                   alt="Campaign"
//                   className="w-full h-full object-cover rounded-lg shadow"
//                 />
//               </div>
//             )}
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div><strong>Name:</strong> {selectedCampaign.campaignName}</div>
//               <div><strong>Brand:</strong> {selectedCampaign.brandName}</div>
//               <div>
//                 <strong>Schedule:</strong> {selectedCampaign.startDate?.slice(0, 10)} ({selectedCampaign.startTime}) → {selectedCampaign.endDate?.slice(0, 10)} ({selectedCampaign.endTime})
//               </div>
//               <div><strong>Ad Type:</strong> {selectedCampaign.adType}</div>
//               <div><strong>Store Type:</strong> {selectedCampaign.storeType}</div>
//               <div><strong>Product Type:</strong> {selectedCampaign.productType}</div>
//               <div><strong>Budget:</strong> {selectedCampaign.campaignBudget}</div>
//               <div><strong>Base Bid:</strong> ₹ {selectedCampaign.baseBid}</div>
//               <div><strong>Max Bid:</strong> {selectedCampaign.maxBid}</div>
//               <div><strong>Targeting:</strong> {selectedCampaign.targeting}</div>
//               <div><strong>Status:</strong> {selectedCampaign.isApproved}</div>
//               <div><strong>Progress:</strong> {selectedCampaign.achieveStatus}</div>
//               <div><strong>Duration:</strong> {selectedCampaign.duration} sec</div>
//               <div><strong>Created At:</strong> {new Date(selectedCampaign.createdAt).toLocaleString()}</div>
//               <div><strong>Updated At:</strong> {new Date(selectedCampaign.updatedAt).toLocaleString()}</div>
//             </div>

//             {selectedCampaign.isApproved === "PENDING" && (
//               <div className="flex justify-end gap-3 mt-6">
//                 <button
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//                   onClick={() => handleApproval("APPROVE")}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
//                   onClick={openRejectModal}
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </Modal>

//       {/* Reject Reason Modal */}
//       <Modal
//         isOpen={isRejectModalOpen}
//         onClose={closeRejectModal}
//         size="md"
//         showCloseButton={true}
//       >
//         <div className="p-4 space-y-3">
//           <h3 className="text-lg font-semibold">Reject Campaign</h3>
//           <textarea
//             value={rejectionRemark}
//             onChange={(e) => setRejectionRemark(e.target.value)}
//             placeholder="Reason for rejection..."
//             className="w-full h-24 p-2 border rounded"
//           />
//           <div className="flex justify-end gap-2">
//             <button
//               className="bg-gray-300 px-4 py-2 rounded"
//               onClick={closeRejectModal}
//             >
//               Cancel
//             </button>
//             <button
//               className={`px-4 py-2 text-white rounded ${
//                 rejectionRemark.trim()
//                   ? "bg-red-600 hover:bg-red-700"
//                   : "bg-red-300 cursor-not-allowed"
//               }`}
//               onClick={() => handleApproval("REJECTED", rejectionRemark)}
//               disabled={!rejectionRemark.trim()}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default CampaignRequest;
