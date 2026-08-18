import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { FileText, Plus, Pencil, Trash2, X, Save, Search } from 'lucide-react';

const AdminBlog = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', author: '', date: '', image: '', category: '' });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = (blogPosts || []).filter((p) => (p.title || '').toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditingId(null); setForm({ title: '', slug: '', excerpt: '', content: '', author: 'Clinical Editor', date: new Date().toISOString().split('T')[0], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80', category: 'Health Tips' }); setShowForm(true); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ ...item }); setShowForm(true); };

  const handleSave = (e) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingId) { updateBlogPost(editingId, { ...form, slug }); }
    else { addBlogPost({ ...form, slug }); }
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-sky-700" />
            <span>Health & Medical Articles</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage health awareness articles and specialist publications (Total: {(blogPosts || []).length})</p>
        </div>
        <button onClick={openAdd} className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 transition-colors cursor-pointer">
          <Plus className="w-4 h-4" /><span>Add Article</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles by title..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600" />
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200">
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Article Title</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Category</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Author</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Publish Date</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5 font-semibold text-slate-800 max-w-xs truncate">{post.title}</td>
                  <td className="px-4 py-2.5"><span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">{post.category}</span></td>
                  <td className="px-4 py-2.5 text-slate-600">{post.author}</td>
                  <td className="px-4 py-2.5 text-slate-500">{post.date}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button onClick={() => openEdit(post)} className="p-1 text-slate-500 hover:text-sky-700 hover:bg-slate-100 rounded cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setDeleteConfirm(post.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-6 text-center text-xs text-slate-400">No blog articles found</div>}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-lg space-y-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Delete Blog Post?</h3>
            <p className="text-xs text-slate-500">This will remove the article from public view.</p>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
              <button onClick={() => { deleteBlogPost(deleteConfirm); setDeleteConfirm(null); }} className="px-3.5 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-5 max-w-lg w-full shadow-xl space-y-3 my-4 max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{editingId ? 'Edit Article' : 'Add New Article'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              {[
                { key: 'title', label: 'Article Title', required: true },
                { key: 'slug', label: 'URL Slug (auto-generated if empty)' },
                { key: 'category', label: 'Category', placeholder: 'Cardiology Tips / Wellness' },
                { key: 'author', label: 'Author / Specialist Name' },
                { key: 'date', label: 'Publish Date', type: 'date' },
                { key: 'image', label: 'Article Featured Image URL' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block font-semibold text-slate-700 mb-1">{f.label}</label>
                  <input type={f.type || 'text'} required={f.required} value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white" />
                </div>
              ))}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Summary (Excerpt)</label>
                <textarea rows={2} value={form.excerpt || ''} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Article Body</label>
                <textarea rows={5} value={form.content || ''} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none" />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" /><span>{editingId ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
