import {profilePhoto, bell_icon} from "../assets/assets"
const ProfileHeader = () => {
  return (
    <div className="h-[5.5rem] p-7 border-neutral-200 border-b w-full flex justify-between items-center ">
      <h1 className="text-4xl text-dark_violet font-bold">PEOPLE.CO</h1>
      <div className="flex items-center w-40 text-right justify-between">
        <button className="w-9 h-9 flex justify-center items-center"><img src = {bell_icon} alt = "notification" className = "w-5 h-5"/></button>
        <img src = {profilePhoto} alt = "Avatar" className = "w-9 h-9"/>
        <h4 className="font-bold">John Doe</h4>
      </div>
    </div>
  );
};

export default ProfileHeader;
