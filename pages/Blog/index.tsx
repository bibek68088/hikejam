import React from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";
import blogData from "../../public/blogPosts.json";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  image: string;
  date: string;
}

const BlogPage: React.FC = () => {
  console.log("Blog Data:", blogData);
  const displayedPosts: BlogPost[] = blogData.slice(0, 9);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-50">
      <div className="px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center sm:text-left mb-4 sm:mb-0">
            HikeJam Blog
          </h1>
          <Link href="/submit-blog">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition duration-200">
              ✍️ Write Your Blog
            </button>
          </Link>
        </div>

        {blogData.length === 0 ? (
          <p className="text-center text-gray-600">No blog posts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayedPosts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                image={post.image}
              />
            ))}
          </div>
        )}

        {blogData.length > 9 && (
          <div className="text-center mt-8">
            <Link href="/blog?page=2">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold">
                Load More
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
