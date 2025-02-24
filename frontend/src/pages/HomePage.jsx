import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "../components/Spinner";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { authUser, loading: authLoading } = useAuthContext();
  const [userProfiles, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState("recent");

  //MAKE API CALL TO BACKEND

  const getUserProfileAndRepos = useCallback(async (username) => {
    if (!username) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/users/profile/${username}`);
      const { repos, userProfile } = await res.json();

      // repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      repos ? [...repos].sort((a, b) => new Date(b.created_ay) - new Date(a.created_at)) : [];

      setRepos(repos);
      setUserProfile(userProfile);

      return { userProfile, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authUser && !authLoading) {
      getUserProfileAndRepos(authUser.username);
    }
  }, [getUserProfileAndRepos, authUser, authLoading]);

  //search feature implementations
  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, repos } = await getUserProfileAndRepos(username);

    setUserProfile(userProfile);
    setRepos(repos);
    setSortType("recent");
    setLoading(false);
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending order
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "fork") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }
    setSortType(sortType);
    setRepos([...repos]);
  };
  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfiles && !loading && <ProfileInfo userProfile={userProfiles} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
