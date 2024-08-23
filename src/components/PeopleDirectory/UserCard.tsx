import { type SetStateAction, type Dispatch } from "react";
import { User } from "./users_data.ts"
import { arrowTilt_icon, close_icon } from "../../assets/assets.ts";

const UserCard = ({ user, setSelectedUser: closeCard }: { user: User, setSelectedUser: Dispatch<SetStateAction<User|null>> }) => {
  return (
    <div className="border border-neutral-200 rounded-2xl w-[68%] h-full z-2 bg-white absolute top-0 right-0">
      <div className="flex bg-[#2a5b7e] items-start justify-between h-[15.8%] rounded-t-2xl p-6 text-white">
        <div className="flex gap-9 items-center">
          <img
            src={user?.name.avatarURL}
            alt="avatar"
            className="w-[6.2rem] h-[6.2rem] rounded-full object-cover object-center"
          />
          <div className="flex flex-col gap-3 items-start">
            <div className="text-xl font-bold">
              {user?.name.firstName + " " + user?.name.lastName}
            </div>
            <div className="text-sm font-normal flex">
              <div className="flex flex-col gap-1.5">
                <div>{user?.name.username}</div>
                <div>User ID</div>
              </div>
              <div className="-rotate-90 self-center mr-2.5">______</div>
              <div className="flex flex-col gap-1.5">
                <div>{user?.role}</div>
                <div>Role</div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={()=>closeCard(null)} >
            <img src={close_icon} alt="close" />
        </button>
      </div>
      <div className="flex flex-col p-2.5">
        <h2 className="h-[2.6rem] font-semibold text-base p-2.5 bg-ligh_blue rounded">Personal Information</h2>
        <div className="flex gap-[2.3rem] p-3 border-b border-b-neutral-200">
            <div className="w-[9.5rem] text-sm font-medium text-gray-900">Date of Birth</div>
            <div className="text-base font-normal text-neutral-500">{user?.bio.dob}</div>
        </div>
        <div className="flex gap-[2.3rem] p-3 border-b border-b-neutral-200">
            <div className="w-[9.5rem] text-sm font-medium text-gray-900">Gender</div>
            <div className="text-base font-normal text-neutral-500">{`${user?.sex.charAt(0).toUpperCase()}${user?.sex.slice(1)}`}</div>
        </div>
        <div className="flex gap-[2.3rem] p-3 border-b border-b-neutral-200">
            <div className="w-[9.5rem] text-sm font-medium text-gray-900">Nationality</div>
            <div className="text-base font-normal text-neutral-500">{user?.bio.nationality}</div>
        </div>
        <div className="flex gap-[2.3rem] p-3 border-b border-b-neutral-200">
            <div className="w-[9.5rem] text-sm font-medium text-gray-900">Contact no.</div>
            <div className="text-base font-normal text-neutral-500">{user?.bio.phone}</div>
        </div>
        <div className="flex gap-[2.3rem] p-3 border-b border-b-neutral-200">
            <div className="w-[9.5rem] text-sm font-medium text-gray-900">E-mail Address</div>
            <div className="text-base font-normal text-neutral-500">{user?.email}</div>
        </div>
        <div className="flex gap-[2.3rem] p-3 border-b border-b-neutral-200">
            <div className="w-[9.5rem] text-sm font-medium text-gray-900">Work email Address</div>
            <div className="text-base font-normal text-neutral-500">{user?.email}</div>
        </div>
      </div>
      <div className="flex flex-col p-2.5">
        <h2 className="h-[2.6rem] font-semibold text-base p-2.5 bg-ligh_blue rounded">Research & Publication</h2>
        <div className="p-3 flex flex-col gap-2 items-start">
            <h3 className="text-sm font-medium">AI and User Experience: The Future of Design</h3>
            <p className="text-xs">Published in the Journal of Modern Design • 2022</p>
            <p className="text-xs">AI, IoT based real time condition monitoring of Electrical Machines using Python language Abstract: Maintaining induction motors in good working order before they fail benefits small <button className="text-dark_orange">See More...</button></p>
            <button className="text-dark_orange p-2 flex items-center text-sm font-bold">
              <img src = {arrowTilt_icon} alt='See Publication' className="inline-block"/>
              SEE PUBLICATION
            </button>
        </div>
        <div className="h-[1px] w-[90%] bg-neutral-200" />
      </div>
    </div>
  );
};

export default UserCard;
