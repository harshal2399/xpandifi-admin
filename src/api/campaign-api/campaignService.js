import axiosInstance from "../../config/axiosConfig";
const token = localStorage.getItem("token");
export const createCampaignAPI = async (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof FileList) {
      Array.from(value).forEach((file) => formData.append(key, file));
    } else if (
      value instanceof Date ||
      (typeof value === "object" && value?.$d)
    ) {
      const isoDate = new Date(value.$d || value).toISOString();
      formData.append(key, isoDate);
    } else if (Array.isArray(value)) {
      if (key === "targetRegions") {
        const regionNames = value.map((region) => region.name);
        formData.append(key, JSON.stringify(regionNames));
      } else {
        formData.append(key, JSON.stringify(value));
      }
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  
  const token = localStorage.getItem("token");
  const response = await axiosInstance.post(
    "/api/v1/campaign/createCampaign",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response?.data;
};

export const getCampaignsAPI = async () => {
  const response = await axiosInstance.get("/api/v1/campaigns/getAllCampaigns", {
    withCredentials: true,
  });
  // console.log("Response from getCampaignsAPI:", response);
  return response.data;
};


export const toggleCampaignStatusAPI = async (id, status) => {
  const response = await axiosInstance.put(`/api/v1/campaign/${id}/status`, {
    status,
  });
  return response.data;
};

export const getCampaignByIdAPI = async (id) => {
  const response = await axiosInstance.get(
    `/api/v1/campaign/${id}/getCampaign`,

    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
 
  return response?.data?.data;
};

export const updateUserCampaign = async (id , data) =>  {
  console.log(data)

  const response = await axiosInstance.put(`api/v1/campaign/${id}/updateCampaign` , data ,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response?.data;

}