import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import blogData from "../../public/blogPosts.json";
import ContactPage from "../contact";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  image: string;
  date: string;
}

interface BlogPostPageProps {
  post: BlogPost | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogData.map((post) => ({
    params: { slug: post.slug },
  }));
  console.log("Generated Paths:", paths);
  return { paths, fallback: false }; // Changed to false
};

export const getStaticProps: GetStaticProps<BlogPostPageProps, { slug: string }> = async ({ params }) => {
  console.log("Params:", params);
  const post = blogData.find((p) => p.slug === params?.slug);
  console.log("Found Post:", post);
  return {
    props: {
      post: post || null,
    },
  };
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-white to-gray-50">
        <Navbar />
        <div className="flex-1 max-w-3xl mx-auto text-center py-8">
          <h1 className="text-2xl font-bold text-gray-900">Post Not Found</h1>
          <p className="text-gray-600">Sorry, we couldn’t find the blog post you’re looking for.</p>
          <Link href="/blog">
            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold">
              Back to Blog
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  console.log("Post Object:", post);
  console.log("Image Path:", post.image);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-white to-gray-50">
      <div className="flex-1 px-4 py-8">
        <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-orange-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-6">Published on {post.date}</p>
          <div className="relative w-full h-64 mb-6 group">
            {post.image ? (
              <Image
                src={post.image}
                alt={`${post.title} image`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  console.log("Image Load Error:", post.image, e);
                  (e.target as HTMLImageElement).src = "/fallback.jpg";
                }}
                onLoadingComplete={() => console.log("Image Loaded Successfully:", post.image)}
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Image Not Available</span>
              </div>
            )}
            <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p>{post.content}</p>
          </div>
          <div className="mt-8">
            <Link href="/Blog">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold">
                Back to Blog
              </button>
            </Link>
          </div>
        </article>
      </div>
      <ContactPage/>
   
      <Footer />
    </div>
  );
};

export default BlogPostPage;