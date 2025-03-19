import React, { useState, useEffect } from "react";
import { FaHeart, FaComment } from "react-icons/fa";

const Post = ({ 
  id, avatar, author, download_url, birthDate, reactions = [], 
  onCategoryClick, onPostClick, onUserClick 
}) => {
  
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));

  useEffect(() => {
    setLikeCount(likeCount);
  }, [likeCount]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg mb-6 max-w-[500px] mx-auto">
      {/* User Info */}
      <div 
        className="flex items-center space-x-3 cursor-pointer" 
        onClick={() => onUserClick(id, author)}
      >
        <img 
          className="w-12 h-12 rounded-full object-cover border border-gray-500" 
          src={avatar} alt={author} 
        />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-gray-400 text-sm">Born: {birthDate}</p>
        </div>
      </div>

      {/* Post Image */}
      <div 
        className="mt-4 cursor-pointer relative group w-full h-[250px] overflow-hidden rounded-md"
        onClick={() => onPostClick(id)}
      >
        <img 
          className="w-full h-full object-cover rounded-md transition transform group-hover:scale-105 duration-300" 
          src={download_url} alt="Post" 
        />
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between mt-4">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }} 
          className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition"
        >
          <FaHeart className={`${liked ? "text-red-500" : ""}`} />
          <span>{likeCount}</span>
        </button>
        <FaComment className="text-gray-400 hover:text-blue-400 transition cursor-pointer" />
      </div>

      {/* Categories (Tags) */}
      <div className="mt-4">
        {reactions.map((reaction, index) => (
          <span 
            key={index} 
            className="text-yellow-400 cursor-pointer hover:text-yellow-300 mr-2"
            onClick={() => onCategoryClick(reaction.message)}
          >
            #{reaction.message}
          </span>
        ))}
      </div>

      {/* Comments */}
      <div className="mt-4 border-t border-gray-600 pt-3">
        {reactions.map((reaction, index) => (
          <div key={index} className="flex items-center space-x-3 mb-2">
            <img 
              className="w-8 h-8 rounded-full object-cover border border-gray-400" 
              src={reaction.avatar} alt={reaction.handle} 
            />
            <div>
              <p className="text-sm font-semibold">{reaction.handle}</p>
              <p className="text-gray-400 text-xs">{reaction.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
