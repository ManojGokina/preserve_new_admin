import React, { useState } from 'react';
import { 
  File, FileText, FileSpreadsheet, Image, Download, Eye, Share2, 
  Folder, FolderPlus, Upload, Search, Grid, List, Star, MoreVertical,
  Clock, Filter, SortAsc, ChevronRight, Plus, Trash2
} from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  modified: string;
  icon: any;
  starred?: boolean;
  shared?: boolean;
  preview?: string;
}

interface Folder {
  id: number;
  name: string;
  documents: number;
  modified: string;
}

const folders: Folder[] = [
  { id: 1, name: 'Projects', documents: 15, modified: '2024-03-15' },
  { id: 2, name: 'Client Files', documents: 8, modified: '2024-03-14' },
  { id: 3, name: 'Reports', documents: 12, modified: '2024-03-13' },
];

const documents: Document[] = [
  {
    id: 1,
    name: 'Annual Report 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    modified: '2024-03-15 14:30',
    icon: FileText,
    starred: true,
    shared: true,
    preview: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Financial Summary.xlsx',
    type: 'Excel',
    size: '1.8 MB',
    modified: '2024-03-14 09:15',
    icon: FileSpreadsheet,
    shared: true
  },
  {
    id: 3,
    name: 'Project Presentation.pdf',
    type: 'PDF',
    size: '3.2 MB',
    modified: '2024-03-13 16:45',
    icon: FileText,
    preview: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Marketing Assets.jpg',
    type: 'Image',
    size: '4.5 MB',
    modified: '2024-03-12 11:20',
    icon: Image,
    starred: true,
    preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Contract Template.pdf',
    type: 'PDF',
    size: '1.1 MB',
    modified: '2024-03-11 15:10',
    icon: File,
    shared: true
  }
];

function Docs() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreview, setShowPreview] = useState<Document | null>(null);
  const [showShareModal, setShowShareModal] = useState<Document | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'size'>('modified');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleUpload = (e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log('Uploading files...');
    setShowUploadModal(false);
  };

  const handleShare = (doc: Document) => {
    setShowShareModal(doc);
    // In a real app, this would open a sharing dialog
  };

  const handlePreview = (doc: Document) => {
    setShowPreview(doc);
    // In a real app, this would open a document preview
  };

  const handleDownload = (doc: Document) => {
    console.log(`Downloading ${doc.name}`);
    // In a real app, this would trigger the download
  };

  const toggleStar = (docId: number) => {
    // In a real app, this would update the document's starred status
    console.log(`Toggling star for document ${docId}`);
  };

  const handleSort = (criteria: 'name' | 'modified' | 'size') => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Documents</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          >
            {viewMode === 'grid' ? <Grid className="h-5 w-5" /> : <List className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
          >
            <Upload className="h-5 w-5" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
          <Filter className="h-5 w-5" />
        </button>
        <button 
          onClick={() => handleSort('modified')}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
        >
          <SortAsc className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <button className="w-full flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10">
            <FolderPlus className="h-5 w-5" />
            <span>New Folder</span>
          </button>

          <div className="space-y-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Folder className="h-5 w-5" />
                  <span>{folder.name}</span>
                </div>
                <span className="text-sm text-white/50">{folder.documents}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid/List */}
        <div className="lg:col-span-3">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 overflow-hidden group"
                >
                  {doc.preview ? (
                    <div className="aspect-video relative group">
                      <img
                        src={doc.preview}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => handlePreview(doc)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Eye className="h-5 w-5 text-white" />
                        </button>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Download className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center bg-white/5">
                      <doc.icon className="h-16 w-16 text-white/30" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-white/50">
                          {doc.size} • {doc.type}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleStar(doc.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          doc.starred ? 'text-yellow-400' : 'text-white/30 hover:text-white/70'
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-white/50">
                      <span>{doc.modified}</span>
                      <div className="flex items-center gap-2">
                        {doc.shared && (
                          <button
                            onClick={() => handleShare(doc)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        )}
                        <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="group hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <doc.icon className="h-5 w-5 text-white/70 mr-3" />
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">{doc.name}</span>
                            {doc.starred && (
                              <Star className="h-4 w-4 text-yellow-400" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                        {doc.modified}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                        {doc.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handlePreview(doc)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Eye className="h-4 w-4 text-white/70" />
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Download className="h-4 w-4 text-white/70" />
                          </button>
                          {doc.shared && (
                            <button
                              onClick={() => handleShare(doc)}
                              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <Share2 className="h-4 w-4 text-white/70" />
                            </button>
                          )}
                          <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                            <MoreVertical className="h-4 w-4 text-white/70" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Files</h2>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleUpload}
              className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center"
            >
              <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <p className="text-white mb-2">Drag and drop files here</p>
              <p className="text-white/50 text-sm mb-4">or</p>
              <label className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10 cursor-pointer">
                Browse Files
                <input type="file" className="hidden" onChange={handleUpload} multiple />
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-4xl rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">{showPreview.name}</h2>
              <button
                onClick={() => setShowPreview(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>
            {showPreview.preview ? (
              <img
                src={showPreview.preview}
                alt=""
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center bg-white/5 rounded-lg">
                <showPreview.icon className="h-24 w-24 text-white/30" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Share Document</h2>
              <button
                onClick={() => setShowShareModal(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <div className="flex items-center gap-2">
                <select className="flex-1 px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                  <option value="view">Can view</option>
                  <option value="edit">Can edit</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Docs;