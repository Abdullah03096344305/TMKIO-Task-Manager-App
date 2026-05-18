'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Folder, 
  FileText, 
  Image as ImageIcon,
  Figma,
  Layers,
  HardDrive,
  Upload,
  Download,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const FilesAdminPanel = () => {
  const { user } = useUser();
  const [filesData, setFilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    // Folder data
    folder_name: '',
    folder_count: '',
    folder_color: 'bg-blue-600/20 text-blue-400',
    folder_tags: [],
    
    // File data
    file_name: '',
    file_type: '',
    file_size: '',
    file_date: '',
    file_icon: 'FileText',
    file_icon_color: 'text-amber-500 bg-amber-500/10',
    
    // Category data
    category_name: '',
    category_size: '',
    category_color: 'bg-blue-500',
    category_percentage: 0,
    
    // Chart data
    chart_media: 0,
    chart_photos: 0,
    chart_docs: 0,
    
    // Storage
    total_storage: '512GB',
    used_storage: '130GB',
    storage_percentage: 85,
    
    // Avatars
    member_avatars: [],
  });

  const [activeTab, setActiveTab] = useState('folders'); // folders, files, categories, storage

  // Fetch all data
  const fetchFilesData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('files')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setFilesData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      fetchFilesData();
    }
  }, [user?.id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    const arrayValue = value.split(',').map(v => v.trim());
    setFormData(prev => ({ ...prev, [name]: arrayValue }));
  };

  // Save data to Supabase
  const handleSave = async () => {
    if (!user?.id) return;

    const dataToSave = {
      ...formData,
      created_by: user.id,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (editingItem) {
      result = await supabase
        .from('files')
        .update(dataToSave)
        .eq('id', editingItem.id);
    } else {
      result = await supabase
        .from('files')
        .insert([dataToSave]);
    }

    if (!result.error) {
      await fetchFilesData();
      resetForm();
      setShowForm(false);
      alert(editingItem ? 'Updated successfully!' : 'Added successfully!');
    } else {
      alert('Error: ' + result.error.message);
    }
  };

  // Delete data
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', id);
      
      if (!error) {
        await fetchFilesData();
        alert('Deleted successfully!');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  // Edit data
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      folder_name: item.folder_name || '',
      folder_count: item.folder_count || '',
      folder_color: item.folder_color || 'bg-blue-600/20 text-blue-400',
      folder_tags: item.folder_tags || [],
      file_name: item.file_name || '',
      file_type: item.file_type || '',
      file_size: item.file_size || '',
      file_date: item.file_date || '',
      file_icon: item.file_icon || 'FileText',
      file_icon_color: item.file_icon_color || 'text-amber-500 bg-amber-500/10',
      category_name: item.category_name || '',
      category_size: item.category_size || '',
      category_color: item.category_color || 'bg-blue-500',
      category_percentage: item.category_percentage || 0,
      chart_media: item.chart_media || 0,
      chart_photos: item.chart_photos || 0,
      chart_docs: item.chart_docs || 0,
      total_storage: item.total_storage || '512GB',
      used_storage: item.used_storage || '130GB',
      storage_percentage: item.storage_percentage || 85,
      member_avatars: item.member_avatars || [],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      folder_name: '',
      folder_count: '',
      folder_color: 'bg-blue-600/20 text-blue-400',
      folder_tags: [],
      file_name: '',
      file_type: '',
      file_size: '',
      file_date: '',
      file_icon: 'FileText',
      file_icon_color: 'text-amber-500 bg-amber-500/10',
      category_name: '',
      category_size: '',
      category_color: 'bg-blue-500',
      category_percentage: 0,
      chart_media: 0,
      chart_photos: 0,
      chart_docs: 0,
      total_storage: '512GB',
      used_storage: '130GB',
      storage_percentage: 85,
      member_avatars: [],
    });
    setShowForm(false);
  };

  // Icon options
  const iconOptions = ['FileText', 'ImageIcon', 'Figma', 'Layers', 'HardDrive', 'Folder'];
  
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'FileText': return FileText;
      case 'ImageIcon': return ImageIcon;
      case 'Figma': return Figma;
      case 'Layers': return Layers;
      case 'HardDrive': return HardDrive;
      default: return Folder;
    }
  };

  // Color options
  const colorOptions = [
    'bg-blue-600/20 text-blue-400', 'bg-indigo-600/20 text-indigo-400',
    'bg-cyan-600/20 text-cyan-400', 'bg-amber-600/20 text-amber-400',
    'bg-emerald-600/20 text-emerald-400', 'bg-rose-600/20 text-rose-400'
  ];

  return (
    <div className="w-full p-6 bg-[#0f1119] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Files Management Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Manage all files, folders, and storage data</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#5f47ff] hover:bg-[#4c36e0] text-white px-4 py-2 rounded-xl text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add New Item
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-800">
        {['folders', 'files', 'categories', 'storage'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab 
                ? 'text-[#5f47ff] border-b-2 border-[#5f47ff]' 
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#181b2a] border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 sticky top-0 bg-[#181b2a]">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button onClick={resetForm} className="p-1 hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Folder Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Folder Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="folder_name" placeholder="Folder Name" value={formData.folder_name} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="text" name="folder_count" placeholder="Folder Count (e.g., '24 files')" value={formData.folder_count} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <select name="folder_color" value={formData.folder_color} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800">
                    {colorOptions.map(color => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                  <input type="text" name="folder_tags" placeholder="Tags (comma separated: A, B)" value={formData.folder_tags.join(',')} onChange={handleArrayInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                </div>
              </div>

              {/* File Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">File Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="file_name" placeholder="File Name" value={formData.file_name} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="text" name="file_type" placeholder="File Type" value={formData.file_type} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="text" name="file_size" placeholder="File Size (e.g., '2.9 MB')" value={formData.file_size} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="text" name="file_date" placeholder="Date (e.g., 'Feb 25, 2022')" value={formData.file_date} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <select name="file_icon" value={formData.file_icon} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800">
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <input type="text" name="file_icon_color" placeholder="Icon Color Class" value={formData.file_icon_color} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                </div>
              </div>

              {/* Category Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Storage Category</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="category_name" placeholder="Category Name" value={formData.category_name} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="text" name="category_size" placeholder="Category Size" value={formData.category_size} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="text" name="category_color" placeholder="Category Color Class" value={formData.category_color} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="number" name="category_percentage" placeholder="Percentage" value={formData.category_percentage} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                </div>
              </div>

              {/* Chart Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Chart Data</h3>
                <div className="grid grid-cols-3 gap-4">
                  <input type="number" name="chart_media" placeholder="Media %" value={formData.chart_media} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="number" name="chart_photos" placeholder="Photos %" value={formData.chart_photos} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="number" name="chart_docs" placeholder="Docs %" value={formData.chart_docs} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                </div>
              </div>

              {/* Storage Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">Storage Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="total_storage" placeholder="Total Storage" value={formData.total_storage} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="text" name="used_storage" placeholder="Used Storage" value={formData.used_storage} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                  <input type="number" name="storage_percentage" placeholder="Storage %" value={formData.storage_percentage} onChange={handleInputChange} className="bg-[#121420] text-slate-200 px-4 py-2 rounded-xl border border-slate-800" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-slate-800 sticky bottom-0 bg-[#181b2a]">
              <button onClick={resetForm} className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-[#5f47ff] text-white hover:bg-[#4c36e0]">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-800">
              <tr>
                <th className="text-left p-4 text-xs font-semibold text-slate-400">Folder Name</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400">File Name</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400">Category</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400">Storage Used</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400">Created By</th>
                <th className="text-left p-4 text-xs font-semibold text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">Loading...</td>
                </tr>
              ) : filesData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">No data found. Click "Add New Item" to create.</td>
                </tr>
              ) : (
                filesData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-sm text-slate-300">{item.folder_name || '-'}</td>
                    <td className="p-4 text-sm text-slate-300">{item.file_name || '-'}</td>
                    <td className="p-4 text-sm text-slate-300">{item.category_name || '-'}</td>
                    <td className="p-4 text-sm text-slate-300">{item.used_storage || '-'}</td>
                    <td className="p-4 text-sm text-slate-300">{item.created_by}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="p-1 hover:bg-slate-700 rounded-lg text-blue-400">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-slate-700 rounded-lg text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilesAdminPanel;