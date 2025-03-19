import React from "react";
import Post from "./Post";

const UserProfile = ({
  user,
  articles,
  onCategoryClick, // Fix: Rename this prop
  onPostClick,
  onBackClick,
  onUserClick, // Fix: Rename this prop
}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <button
        onClick={onBackClick}
        className="mb-4 text-blue-400 hover:text-blue-300 transition"
      >
        ← Back to Feed
      </button>

      <div className="flex items-center space-x-4 border-b border-gray-700 pb-4">
        <img
          src={user?.avatar} // Fix: avatar correct field hai
          alt={user?.username}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.username}</h2>
          <p className="text-sm text-gray-400">
            Date of Birth: {user?.birthDate || "Not specified"}
          </p>
          <p className="text-sm text-gray-400">Member since 2021</p>
          <p className="text-sm text-gray-400">Posts: {articles.length}</p>
        </div>
      </div>

      <div className="mt-4">
        {articles.length > 0 ? (
          articles.map((post) => {
            return (
              <Post
                key={post.id}
                avatar={post.avatar} // Fix: `post.avatar` hona chahiye
                author={post.author}
                download_url={post.download_url}
                birthDate="March 19, 2025"
                tags={post.categories} // Fix: `categories` bhej raha hu kyunki `tags` nahi hai
                reactions={post.reactions} // Fix: `post.comments` ki jagah `post.reactions`
                onTagClick={onCategoryClick}
                onPostClick={() => onPostClick(post)}
                onProfileClick={(userId, username) =>
                  onUserClick(userId || post, username || post.author)
                }
              />
            );
          })
        ) : (
          <p className="text-gray-400 text-center">No posts yet</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
