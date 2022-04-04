import { useState } from "react";

const Blog = ({ blog }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className="blog-post">
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <p className="title">{blog.title}</p>
        <p className="author">by {blog.author}</p>
        <button onClick={() => setExpand(!expand)}>
          {expand ? "hide" : "view"}
        </button>
      </div>
      {expand && (
        <div>
          <p>{blog.url}</p>
          <span style={{ display: "flex", alignItems: "center" }}>
            <p>likes {blog.likes}</p> <button>like</button>
          </span>
          <p>{blog.user.username}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
