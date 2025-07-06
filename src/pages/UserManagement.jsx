import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal/Modal";
import ReusableTable from "../components/table/ReusableTable";
import { Switch, Chip } from "@mui/material";
import Input from "../components/ui/input/Input";
import Loader from "../components/ui/loader/Loader";

const UserManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [selectedRole, setSelectedRole] = useState("Retailer");
  const [formLoading, setFormLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("https://branchx-admin-apis.onrender.com/api/v1/users", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleStatusChange = (userId, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [userId]: true }));
    axios
      .put(
        `https://branchx-admin-apis.onrender.com/api/v1/users/${userId}/status`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then(() => {
        setData((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
      })
      .finally(() =>
        setActionLoading((prev) => ({ ...prev, [userId]: false }))
      );
  };

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      role: selectedRole,
      status: "ACTIVE",
    };

    try {
      setFormLoading(true);
      await axios.post(
        "https://branchx-backend-api-4.onrender.com/api/v1/users/createUser",
        payload,
        { withCredentials: true }
      );
      reset();
      setSelectedRole("Retailer");
      setIsOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const columns = [
    {
      id: "fullName",
      label: "Full Name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "phone",
      label: "Phone Number",
    },
    {
      id: "role",
      label: "Role",
      render: (row) => (
        <Chip
          label={row.role}
          size="small"
          sx={{
            backgroundColor: row.role === "Retailer" ? "#CA9225" : "#445C91",
            color: "white",
            fontWeight: 600,
            px: 1.5,
            borderRadius: 2,
          }}
        />
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (row) => (
        <Switch
          checked={row.status === "ACTIVE"}
          disabled={actionLoading[row.id]}
          onChange={() =>
            handleStatusChange(
              row.id,
              row.status === "ACTIVE" ? "REJECTED" : "ACTIVE"
            )
          }
          size="small"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#445C91",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#445C91",
            },
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button label="Add User" onClick={() => setIsOpen(true)} />
      </div>

      {/* Modal with React Hook Form */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="lg"
        showCloseButton={true}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 space-y-6">
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-xl font-bold">Add User</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status</span>
                <Switch
                  checked
                  disabled
                  size="small"
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#445C91",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#445C91",
                    },
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex">
                <div className="flex-1 mr-4 gap-2">
                  <label className="block text-sm font-medium">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full"
                    {...register("fullName", { required: true })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <div className="flex gap-2">
                    {["Retailer", "Ad-Agency"].map((role) => (
                      <Button
                        key={role}
                        variant="custom"
                        type="button"
                        className={`w-[110px] h-[30px] rounded-full text-sm font-semibold border transition-all duration-150 ${
                          selectedRole === role
                            ? "bg-[#445C91] text-white border-[#445C91]"
                            : "bg-white text-[#445C91] border-[#445C91]"
                        }`}
                        onClick={() => setSelectedRole(role)}
                        label={role}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    {...register("email", { required: true })}
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter phone number"
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  label={formLoading ? <Loader size="vs" /> : "Add User"}
                  className="px-6 py-2"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <div className="mt-4">
        <ReusableTable columns={columns} rows={data} loading={loading} />
      </div>
    </div>
  );
};

export default UserManagement;
