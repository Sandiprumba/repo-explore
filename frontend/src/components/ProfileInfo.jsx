import { FaEye, FaTwitter } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { TfiThought } from "react-icons/tfi";
import { RiUserFollowFill } from "react-icons/ri";
import { formatMemberSince } from "../utils/Date.Function";
import LikeProfile from "./LikeProfile";

const ProfileInfo = ({ userProfile }) => {
  // const userProfile = {
  //   avatar_url: "https://avatars.githubusercontent.com/u/106735885?s=400&u=fd81be225aef6d67d8a6ba9043c36a4be9151eac&v=4",
  //   bio: "k chha randiko baan haru",
  //   Email: "Randi@gmail.com",
  //   followers: "",
  //   following: "",
  //   html_url: "https://github.com/Sandiprumba",
  //   location: "ulululu",
  //   name: "Randi Bahadur",
  //   public_gists: "",
  //   public_repos: "",
  //   twitter_username: "lado",
  //   login: "@Fookat",
  // };

  const memberSince = formatMemberSince(userProfile?.created_at);
  return (
    <div className="lg:w-1/3 w-full flex flex-col gap-2 lg:sticky md:top-10">
      <div className="bg-glass rounded-lg p-4 ">
        <div className="flex gap-3 items-center">
          <a href={userProfile?.html_url} target="_blank" rel="noreferrer">
            <img src={userProfile?.avatar_url} className="rounded-full w-24 h-24 mb-2" alt="" />
          </a>
          <div className="flex gap-2 items-center flex-col">
            <LikeProfile userProfile={userProfile} />
            <a
              href={userProfile?.html_url}
              target="_black"
              rel="noreferrer"
              className="bg-glass font-medium w-full text-xs p-2 rounded-md cursor-pointer border border-blue-400 flex items-center gap-2"
            >
              <FaEye size={16} /> View On Github
            </a>
          </div>
        </div>

        {userProfile?.bio ? (
          <div>
            <TfiThought />
            <p className="text-sm">{userProfile?.bio.substring(0, 60)}...</p>
          </div>
        ) : null}
        {userProfile?.location ? (
          <div>
            <IoLocationOutline />
            {userProfile?.location}
          </div>
        ) : null}
        {userProfile?.twitter_username ? (
          <a href={`https://twitter.com/${userProfile?.twitter_username}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-sky-500">
            <FaTwitter />
            {userProfile.twitter_username}
          </a>
        ) : null}
        <div className="my-2">
          <p className="text-gray-600 font-bold text-sm">Member since</p>
          <p className="">{memberSince}</p>
        </div>

        {userProfile?.Email && (
          <div className="my-2">
            <p className="text-gray-600  font-bold text-sm">Email address:</p>
            <p className="">{userProfile.Email}</p>
          </div>
        )}
        {userProfile?.name && (
          <div className="my-2">
            <p className="text-gray-600  font-bold text-sm">Full Name:</p>
            <p className="">{userProfile.name}</p>
          </div>
        )}

        <div className="my-2">
          <p className="text-gray-600 font-bold text-sm">Username</p>
          <p>{userProfile?.login}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mx-4">
        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiUserFollowFill className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Followers:{userProfile?.followers}</p>
        </div>
        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiUserFollowFill className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Following:{userProfile?.following}</p>
        </div>
        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiUserFollowFill className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Public repos:{userProfile?.public_repos}</p>
        </div>
        <div className="flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24">
          <RiUserFollowFill className="w-5 h-5 text-blue-800" />
          <p className="text-xs">Public gists:{userProfile?.public_gists}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
