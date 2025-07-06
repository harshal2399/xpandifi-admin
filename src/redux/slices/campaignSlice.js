import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createCampaignAPI,
  getCampaignsAPI,
  toggleCampaignStatusAPI,
} from "../../api/campaign-api/campaignService";
import axios from "axios";

export const createCampaign = createAsyncThunk(
  "campaign/createCampaign",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCampaignAPI(data);
      toast.success("Campaign created successfully!");
      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          "An error occurred while creating the campaign."
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCampaigns = createAsyncThunk(
  "campaign/fetchCampaigns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCampaignsAPI();

      console.log("Response from fetchCampaigns:", response);

      if (response.length === 0) {
        toast.info("No campaigns found.");
      } else {
        toast.success("Campaigns fetched successfully!");
      }
      return response;
    } catch (error) {
      toast.error("Failed to fetch campaigns.");
      return rejectWithValue(error.response?.data);
    }
  }
);
export const campaignApproval = createAsyncThunk(
  "campaign/campaignApproval",
  async ({ id, status, remark }, { rejectWithValue }) => {
    try {
      console.log("Campaign Approval Data:", { id, status, remark });

      const payload = { isApproved: status };
      if (status === "REJECT" && remark) {
        payload.remark = remark;
      }

      const response = await axios.put(
        `https://branchx-admin-apis.onrender.com/api/v1/campaigns/${id}/campaignApproval`,
        payload, // ✅ Send the correct payload
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from campaignApproval:", response.data);
      return { id, status, remark };
    } catch (error) {
      console.error("Approval request failed:", error);
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);

// export const campaignApproval = createAsyncThunk(
//   "campaign/campaignApproval",
//   async ({ id, status, remark }, { rejectWithValue }) => {
//     try {
//       const payload = { isApproved: status };
//       if (status === "REJECT" && remark) {
//         payload.remark = remark;
//       }

//       const response = await axios.put(
//         `https://branchx-admin-apis.onrender.com/api/v1/campaigns/${id}/campaignApproval`,
//         payload,
//         { withCredentials: true }
//       );
//       console.log("Response from campaignApproval:", response.data);

//       return { id, status, remark };
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Request failed");
//     }
//   }
// );

export const toggleCampaignStatus = createAsyncThunk(
  "campaign/toggleCampaignStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await toggleCampaignStatusAPI(id, status);
      toast.success(response.message || "Status updated successfully!");
      return { id, status };
    } catch (error) {
      toast.error("Failed to update status");
      return rejectWithValue(error.response?.data);
    }
  }
);

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    loading: false,
    error: null,
    data: null,
    campaigns: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleCampaignStatus.fulfilled, (state, action) => {
        const index = state.campaigns.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.campaigns[index].status = action.payload.status;
        }
      })

      .addCase(campaignApproval.fulfilled, (state, action) => {
        const { id, status, remark } = action.payload;

        // Find and update the specific campaign in local state
        const updatedStatus = status === "APPROVE" ? "APPROVED" : "REJECTED";
        const campaign = state.campaigns.find((c) => c.id === id);
        if (campaign) {
          campaign.isApproved = updatedStatus;
          if (remark) campaign.remark = remark;
        }
      });
  },
});

export default campaignSlice.reducer;
