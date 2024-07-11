import User from "../models/user.models.js";

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const userProfile = await userRes.json();
    const repoRes = await fetch(userProfile?.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message, "getUserProfile error");
  }
};

const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    //authenticated user
    const user = await User.findById(req.user._id.toString());
    console.log(user, "authenticated user");

    const userToLike = await User.findOne({ username });

    if (!userToLike) {
      return res.status(404).json({ error: "User is not available" });
    }
    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: "User already liked" });
    }
    userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
    user.likedProfiles.push(userToLike.username);

    //to save time instead of this way
    // await userToLike.save()
    // await user.save()

    await Promise.all([userToLike.save(), user.save()]);

    res.status(200).json({ message: "User liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

export { getUserProfile, likeProfile, getLikes };
