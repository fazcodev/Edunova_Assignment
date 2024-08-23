import React, { useEffect, useState } from "react";
import { User,  modifyUser } from "./users_data";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@mui/material";
import {
  arrowDown_icon,
  closeBlack_icon,
  closeGray_icon,
  reset_icon,
  trash_icon,
} from "../assets/assets";

// Zod schema for form validation
const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  teams: z.string().min(1, 'Atleast one team is required'),
});
type editProfileSchemaType = z.infer<typeof editProfileSchema>;

// Sample team options
const teamOptions = [
  "Product",
  "Design",
  "Marketing",
  "Finance",
  "Sales",
  "Support",
  "Engineering",
  "HR",
  "QA",
  "R&D",
];

const EditProfileModal = ({
  open,
  user,
  handleClose,
}: {
  open: boolean;
  user: User | null;
  handleClose: () => void;
}) => {
  const [selectedTeams, setSelectedTeams] = useState<string>(user?.teams || "");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  useEffect(() => {
    setSelectedTeams(user?.teams || "");
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<editProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("name", `${user?.name.firstName} ${user?.name.lastName}`);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("status", user.status);
      setValue("teams", selectedTeams);
    }
  }, [user, errors]);

  const handleSelectTeam = (team: string) => {
    if (!selectedTeams.includes(team)) {
      setSelectedTeams((prev) => `${prev},${team}`);
    }
  };

  const handleRemoveTeam = (team: string) => {
    console.log(team);
    setSelectedTeams((prev) => {
      const newTeams = prev.split(",").filter((t) => t !== team).join(",");
      return newTeams
    });
  };

  const handleFormSubmit: SubmitHandler<editProfileSchemaType> = (data) => {
    if (user && data.email && data.name && data.role && data.status && data.teams) {
      modifyUser({
        ...user,
        email: data.email,
        name: {
          ...user.name,
          firstName: data.name.split(" ")[0],
          lastName: data.name.split(" ")[1],
        },
        role: data.role,
        status: data.status as "Active" | "Inactive",
        teams: data.teams,
      });
      handleClose();
    }
  };
  useEffect(() => {
    console.log(selectedTeams);
  }, [selectedTeams])
  return (
    <Modal open={open} onClose={handleClose}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-lg py-6 w-[704px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        <h2 className="text-2xl font-semibold mb-6 px-6">Edit Profile</h2>
        {/* Avatar section */}
        <div className="p-6">
          <div className="text-center">
            <img
              src={user?.name.avatarURL}
              alt="User Avatar"
              className="w-[6.2rem] h-[6.2rem] rounded-full border-neutral-400 border mx-auto mb-4"
            />
          </div>

          {/* Name and Email */}
          <div className="flex flex-col gap-6 mb-6">
            <div className="flex justify-center gap-6">
              <button
                type="button"
                className="flex items-center gap-2 bg-ligh_blue p-2 rounded-[4px] font-bold text-gray-800 border-neutral-300 border"
              >
                <img src={reset_icon} alt="Change Photo" />
                CHANGE PHOTO
              </button>
              <button
                type="button"
                className="flex items-center gap-2 bg-ligh_blue p-2 rounded-[4px] font-bold text-gray-800 border-neutral-300 border"
              >
                <img
                  src={trash_icon}
                  alt="Remove Photo"
                  className="inline-block"
                />
                REMOVE PHOTO
              </button>
            </div>
            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block font-semibold text-base mb-1">
                  Name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  {...register("name")}
                  className="w-full px-3 py-2  border border-neutral-300 border-b-gray-800 outline-none text-gray-700 rounded-md"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block font-semibold text-base mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2  border border-neutral-300 border-b-gray-800 outline-none text-gray-700  rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              {/* Role and Status */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block font-semibold text-base mb-1">
                    Role
                  </label>
                  <select
                    {...register("role")}
                    className="w-full px-3 py-2  border border-neutral-300 border-b-gray-800 outline-none text-gray-700  rounded-md"
                  >
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="Fullstack Developer">
                      Fullstack Developer
                    </option>
                    <option value="UI Designer">Designer</option>
                    <option value="UX Designer">UX Designer</option>
                    <option value="UX Copywriter">UX Copywriter</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Marketing Specialist">
                      Marketing Specialist
                    </option>
                    <option value="Sales Specialist">Sales Specialist</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.role.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="block font-semibold text-base mb-1">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-3 py-2 border border-neutral-300 border-b-gray-800 outline-none text-gray-700  rounded-md"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.status.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              {/* Teams */}
              <div>
                <label className="block font-normal text-base text-gray-700 mb-1">
                  Teams
                </label>
                <input
                  type="text"
                  {...register("teams")}
                  autoFocus = {true}
                  value={selectedTeams}
                />
                <div className="min-h-[45px] p-2 border border-neutral-300 border-b-gray-800 rounded-md flex justify-stretch gap-2">
                  <div
                    className="flex flex-wrap gap-2 grow items-center"
                  >
                    {selectedTeams.split(",").map((team) => (
                      <div
                        key={team}
                        className="h-7 border-neutral-300 border bg-light_orange text-dark_violet text-sm px-1 rounded-[4px] flex items-center gap-2"
                      >
                        {team}
                        <button
                          type="button"
                          onClick={() => handleRemoveTeam(team)}
                          className="text-red-500"
                        >
                          <img
                            src={closeBlack_icon}
                            alt="Delete All"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mr-5">
                    <button
                      type="button"
                      onClick={() => setSelectedTeams("")}
                      className=" rounded-md"
                    >
                      <img
                        src={closeGray_icon}
                        alt="Delete All"
                        className="w-7 h-7"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className=" rounded-md"
                    >
                      <img
                        src={arrowDown_icon}
                        alt="Select Teams"
                        className="w-8 h-8"
                      />
                    </button>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-2 -bottom-10 mt-2 w-48 h-1/4 overflow-y-scroll bg-white border rounded-md shadow-lg">
                      {teamOptions
                        .filter((team) => !selectedTeams.includes(team))
                        .map((team) => (
                          <button
                            key={team}
                            type="button"
                            onClick={() => {
                              handleSelectTeam(team);
                              setDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-ligh_blue"
                          >
                            {team}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                {errors.teams && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.teams.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Submit and Cancel buttons */}
        <div className="flex justify-end gap-4 px-6">
          <button
            type="button"
            onClick={handleClose}
            className="bg-ligh_blue font-bold text-base text-gray-900 border-neutral-300 border px-3 py-2 rounded-md"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="bg-ligh_blue font-bold text-base text-gray-900 border-neutral-300 disabled:opacity-50 border px-3 py-2 rounded-md"
          >
            SAVE
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
