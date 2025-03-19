import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Post from "./Post";
import UserProfile from "./UserProfile";

const ScrollFeed = () => {
  const [articles, setArticles] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    loadArticles();
  }, [pageNumber]);

  const loadArticles = async () => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=10`
      );
      const updatedArticles = response.data.map((item) => ({
        ...item,
        id: `${item.id}-${Date.now()}`, // Ensuring unique keys
        avatar: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(
          Math.random() * 80
        )}.jpg`,
        categories: assignCategories(item.author),
        birthDate: generateRandomDate(),
        reactions: generateRandomReactions(),
      }));
      setArticles((prev) => [...prev, ...updatedArticles]);
    } catch (error) {
      console.error("Error loading articles:", error);
    }
    setIsFetching(false);
  };

  const assignCategories = (author) => {
    const topics = ["tech", "science", "history", "movies", "lifestyle", "gaming"];
    return [author?.split(" ")[0] || "General", topics[Math.floor(Math.random() * topics.length)]];
  };

  const generateRandomDate = () => {
    const year = Math.floor(Math.random() * (2005 - 1985 + 1)) + 1985;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateRandomReactions = () => {
    const feedback = ["Awesome!", "Love it!", "Interesting!", "Cool!"];
    const userHandles = ["alex_99", "sarah_m", "david_c", "lena_w", "tommy_h"];
    return Array(2)
      .fill()
      .map(() => ({
        userId: Math.floor(Math.random() * 1000),
        handle: userHandles[Math.floor(Math.random() * userHandles.length)],
        message: feedback[Math.floor(Math.random() * feedback.length)],
        avatar: `https://randomuser.me/api/portraits/thumb/women/${Math.floor(
          Math.random() * 80
        )}.jpg`,
      }));
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentUser(null);
    setCurrentPost(null);
    setLoadingCategory(true);
    setTimeout(() => setLoadingCategory(false), 500);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetView = () => {
    setActiveCategory(null);
    setCurrentPost(null);
    setCurrentUser(null);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePostSelection = (post) => {
    setCurrentPost(post);
    setCurrentUser(null);
    setActiveCategory(null);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserSelection = (postOrId, username) => {
    setCurrentUser(
      typeof postOrId === "number"
        ? {
            username,
            avatar: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(Math.random() * 80)}.jpg`,
            birthDate: generateRandomDate(),
          }
        : { username: postOrId.author, avatar: postOrId.avatar, birthDate: postOrId.birthDate }
    );
    setCurrentPost(null);
    setActiveCategory(null);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMoreArticles = () => setPageNumber((prev) => prev + 1);

  const filteredArticles = activeCategory
    ? articles.filter((item) => item.categories.includes(activeCategory))
    : articles;

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <div ref={scrollRef}></div>

      {(currentPost || activeCategory || currentUser) && (
        <div className="text-center mb-5">
          <button onClick={resetView} className="bg-purple-500 px-4 py-2 rounded-lg">
            Go Back
          </button>
        </div>
      )}

      {currentUser ? (
        
  
        <UserProfile
          user={currentUser}
          articles={articles || []} // Ensuring articles is not undefined
          onCategoryClick={handleCategoryClick}
          onPostClick={handlePostSelection}
          onBackClick={resetView}
          onUserClick={handleUserSelection}
        />
      ) : activeCategory ? (
        <>
          <div className="text-center text-lg font-bold mb-4">
            Results for <span className="text-yellow-400">#{activeCategory}</span>
          </div>
          {loadingCategory ? (
            <div className="text-center text-lg">Loading...</div>
          ) : (
            filteredArticles.map((article) => (
              <Post
                key={article.id}
                {...article}
                onCategoryClick={handleCategoryClick}
                onPostClick={() => handlePostSelection(article)}
                onUserClick={(id, username) =>
                  handleUserSelection(id || article, username || article.author)
                }
              />
            ))
          )}
        </>
      ) : currentPost ? (
        <Post
          key={currentPost.id}
          {...currentPost}
          onCategoryClick={handleCategoryClick}
          onPostClick={() => handlePostSelection(currentPost)}
          onUserClick={(id, username) =>
            handleUserSelection(id || currentPost, username || currentPost.author)
          }
        />
      ) : (
        filteredArticles.map((article) => (
          <Post
            key={article.id}
            {...article}
            onCategoryClick={handleCategoryClick}
            onPostClick={() => handlePostSelection(article)}
            onUserClick={(id, username) =>
              handleUserSelection(id || article, username || article.author)
            }
          />
        ))
      )}

      {!activeCategory && !currentPost && !currentUser && (
        <div className="text-center my-5">
          {isFetching ? (
            <div className="text-lg">Fetching...</div>
          ) : (
            <button onClick={fetchMoreArticles} className="text-yellow-400 px-4 py-2 text-lg">
              Load More Articles...
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ScrollFeed;
