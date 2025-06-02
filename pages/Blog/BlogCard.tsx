import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, excerpt, slug, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-orange-50">
      {/* Image Section with Overlay */}
      <div className="relative w-full h-48 group">
        <Image
          src={image}
          alt={`${title} image`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 transition-colors duration-300 hover:text-orange-600">
          {title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{excerpt}</p>
        <Link href={`/Blog/${slug}`}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:ring-4 hover:ring-orange-200">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;