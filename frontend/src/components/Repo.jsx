import { FaCodeBranch, FaCopy, FaRegStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaCodeFork } from "react-icons/fa6";
import { formatDate } from "../utils/Date.Function";
import { PROGRAMMING_LANGUAGES } from "../utils/Constants";

const Repo = ({ repo }) => {
  const releasedDate = formatDate(repo.created_at);

  const handleCopyClick = async (repo) => {
    try {
      await navigator.clipboard.writeText(repo.clone_url);
      toast.success("Repo URL copied to clipboad");
    } catch (error) {
      toast.error("Failed to copy the repo");
    }
  };

  return (
    <li className="mb-10 ms-7" key={repo._id}>
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white">
        <FaCodeBranch className="w-5 h-5 text-blue-800" />
      </span>
      <div className="flex gap-2 items-center flex-wrap">
        <a href={repo?.html_url} target="blank" rel="noreferrer" className="flex items-center gap-2 text-lg font-semibold">
          {repo?.name}
        </a>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <FaRegStar />
          {repo?.stargazers_count}
        </span>
        <span className="flex items-center gap-1 bg-purple-100 text-purple-800 rounded-full font-medium text-xs px-2.5 py-0.5">
          <FaCodeFork /> {repo?.forks_count}
        </span>
        <span className="cursor-pointer bg-green-100 text-green-800 text-xs  font-medium px-2.5 py-0.5 rounded-full gap-1 items-center flex" onClick={() => handleCopyClick(repo)}>
          <FaCopy />
        </span>
      </div>
      <time className="block my-1 text-xs font-normal loading-none text-gray-400">Released on: {releasedDate}</time>
      <p className="mb-4 text-base font-normal text-gray-500">{repo.description ? repo.description.slice(0, 500) : "No description provided"}</p>
      {PROGRAMMING_LANGUAGES[repo.language] ? <img src={PROGRAMMING_LANGUAGES[repo.language]} alt="Programming language Icon " className="h-8" /> : null}
    </li>
  );
};

export default Repo;
