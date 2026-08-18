import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { useAdmin } from '../context/AdminContext';
import { Calendar, ChevronRight, User } from 'lucide-react';

const BlogPage = () => {
  const adminContext = useAdmin();
  const blogPosts = adminContext?.blogPosts || defaultBlogPosts;
  const hospitalInfo = adminContext?.hospitalInfo || { name: 'Lifecare' };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-8">
      <PageHero
        title={`${hospitalInfo.name || 'Lifecare'} Health & Medical Articles`}
        subtitle="Clinical Insights, Wellness Guidance, and Expert Advice from Our Medical Specialists"
        breadcrumb={[{ label: 'Blog' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between hover:border-sky-500 hover:shadow-md transition-all">
              <div>
                <div className="h-48 w-full bg-slate-900 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded">{post.category}</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-sky-700" />
                      <span>{post.date}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium flex items-center space-x-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>{post.author}</span>
                </span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-800 hover:underline flex items-center space-x-1"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
