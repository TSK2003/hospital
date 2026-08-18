import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { useAdmin } from '../context/AdminContext';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const adminContext = useAdmin();
  const blogPosts = adminContext?.blogPosts || defaultBlogPosts;

  const post = blogPosts.find(p => p.slug === slug || p.id.toString() === slug) || blogPosts[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-8">
      <PageHero
        title={post.title}
        subtitle={`Published by ${post.author} • Clinical Insights`}
        breadcrumb={[{ label: 'Blog', path: '/blog' }, { label: post.title }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border border-slate-200 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-3">
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded">{post.category}</span>
              <span className="flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-medium text-slate-700">{post.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-sky-700" />
                <span>{post.date}</span>
              </span>
            </div>
          </div>

          <div className="h-80 sm:h-96 w-full rounded overflow-hidden bg-slate-900">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="text-slate-700 text-sm leading-relaxed space-y-3">
            <p className="font-semibold text-base text-slate-900">{post.excerpt}</p>
            <div className="whitespace-pre-line text-slate-600">
              {post.content}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <Link to="/blog" className="text-xs font-semibold text-sky-700 hover:text-sky-800 hover:underline flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Health Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
