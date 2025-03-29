import { useState, useMemo, useEffect } from 'react';
import { MoreVertical, Pencil, Trash2, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Filter, UserPlus, Mail, Phone, MapPin, Calendar, Shield, Check, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { fetchUsers } from '../../store/userSlice';

// Sample data - in a real app, this would come from an API
const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-03-15 14:30',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: '2023-01-15',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-03-14 09:15',
    phone: '+1 (555) 234-5678',
    location: 'London, UK',
    joinDate: '2023-02-20',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Editor',
    status: 'Inactive',
    lastLogin: '2024-03-10 16:45',
    phone: '+1 (555) 345-6789',
    location: 'San Francisco, USA',
    joinDate: '2023-03-10',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-03-15 10:30',
    phone: '+1 (555) 456-7890',
    location: 'Toronto, Canada',
    joinDate: '2023-04-05',
    department: 'Product',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'User',
    status: 'Pending',
    lastLogin: '2024-03-12 11:20',
    phone: '+1 (555) 567-8901',
    location: 'Sydney, Australia',
    joinDate: '2023-05-15',
    department: 'Sales',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  }
];

type SortField = 'name' | 'email' | 'role' | 'status' | 'lastLogin' | 'department';
type FilterField = 'role' | 'status' | 'department';

interface FilterOptions {
  [key: string]: string[];
}

function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<FilterField, string>>({
    role: '',
    status: '',
    department: ''
  });
  const [showUserDetails, setShowUserDetails] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const itemsPerPage = 5;
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log(users)

  const filterOptions: FilterOptions = {
    role: ['Admin', 'User', 'Editor'],
    status: ['Active', 'Inactive', 'Pending'],
    department: ['Engineering', 'Marketing', 'Design', 'Product', 'Sales']
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (field: FilterField, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1);
  };

  const handleUserSelect = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === initialUsers.length
        ? []
        : initialUsers.map(user => user.id)
    );
  };

  const handleDeleteSelected = () => {
    console.log('Deleting users:', selectedUsers);
    setSelectedUsers([]);
    // In a real app, this would make an API call to delete the users
  };

  const handleDeleteUser = (userId: number) => {
    setShowDeleteConfirm(userId);
  };

  const confirmDelete = (userId: number) => {
    console.log('Deleting user:', userId);
    setShowDeleteConfirm(null);
    // In a real app, this would make an API call to delete the user
  };

  const handleEditUser = (userId: number) => {
    navigate(`/dashboard/users/edit/${userId}`);
  };

  const filteredAndSortedUsers = useMemo(() => {
    return [...initialUsers]
      .filter(user => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.role.toLowerCase().includes(searchLower) ||
          user.status.toLowerCase().includes(searchLower) ||
          user.department.toLowerCase().includes(searchLower);

        const matchesFilters = 
          (!filters.role || user.role === filters.role) &&
          (!filters.status || user.status === filters.status) &&
          (!filters.department || user.department === filters.department);

        return matchesSearch && matchesFilters;
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        const modifier = sortDirection === 'asc' ? 1 : -1;
        return aValue.localeCompare(bValue) * modifier;
      });
  }, [searchTerm, sortField, sortDirection, filters]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-30" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Users</h1>
        <div className="flex items-center gap-4">
          {selectedUsers.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete Selected ({selectedUsers.length})</span>
            </button>
          )}
          <button
            onClick={() => navigate('/dashboard/users/new')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
          >
            <UserPlus className="h-5 w-5" />
            <span>Add User</span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${
              showFilters ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg backdrop-blur-lg bg-white/10 border border-white/10">
            {Object.entries(filterOptions).map(([field, options]) => (
              <div key={field}>
                <label className="block text-sm font-medium text-white/70 mb-1 capitalize">
                  {field}
                </label>
                <select
                  value={filters[field as FilterField]}
                  onChange={(e) => handleFilterChange(field as FilterField, e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="">All</option>
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-lg backdrop-blur-lg bg-white/10 shadow-lg border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr className="text-left">
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === initialUsers.length}
                      onChange={handleSelectAll}
                      className="rounded bg-white/10 border-white/10 text-sky-500 focus:ring-white/50"
                    />
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">
                    <button
                      className="flex items-center gap-1 hover:text-white transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      User <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">
                    <button
                      className="flex items-center gap-1 hover:text-white transition-colors"
                      onClick={() => handleSort('role')}
                    >
                      Role <SortIcon field="role" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">
                    <button
                      className="flex items-center gap-1 hover:text-white transition-colors"
                      onClick={() => handleSort('status')}
                    >
                      Status <SortIcon field="status" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">
                    <button
                      className="flex items-center gap-1 hover:text-white transition-colors"
                      onClick={() => handleSort('department')}
                    >
                      Department <SortIcon field="department" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">
                    <button
                      className="flex items-center gap-1 hover:text-white transition-colors"
                      onClick={() => handleSort('lastLogin')}
                    >
                      Last Login <SortIcon field="lastLogin" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelect(user.id)}
                        className="rounded bg-white/10 border-white/10 text-sky-500 focus:ring-white/50"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setShowUserDetails(user.id)}
                        className="flex items-center group/user"
                      >
                        <img
                          src={user.avatar}
                          alt=""
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white group-hover/user:underline">
                            {user.name}
                          </div>
                          <div className="text-sm text-white/70">{user.email}</div>
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{user.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'Active' 
                          ? 'bg-green-400/10 text-green-400'
                          : user.status === 'Inactive'
                          ? 'bg-yellow-400/10 text-yellow-400'
                          : 'bg-blue-400/10 text-blue-400'
                      }`}>
                        {user.status === 'Active' && <Check className="h-3 w-3" />}
                        {user.status === 'Inactive' && <X className="h-3 w-3" />}
                        {user.status === 'Pending' && <AlertCircle className="h-3 w-3" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{user.department}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user.id)}
                          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-white/10">
            <div className="text-sm text-white/70">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedUsers.length)} of {filteredAndSortedUsers.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-2xl rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 p-6">
            {(() => {
              const user = initialUsers.find(u => u.id === showUserDetails);
              if (!user) return null;
              return (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">User Details</h2>
                    <button
                      onClick={() => setShowUserDetails(null)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                    >
                      <Plus className="h-6 w-6 rotate-45" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={user.avatar}
                      alt=""
                      className="h-20 w-20 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-white">{user.name}</h3>
                      <p className="text-white/70">{user.role} • {user.department}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <Mail className="h-5 w-5" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Phone className="h-5 w-5" />
                        <span>{user.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <MapPin className="h-5 w-5" />
                        <span>{user.location}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-white/70">
                        <Calendar className="h-5 w-5" />
                        <span>Joined {user.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Clock className="h-5 w-5" />
                        <span>Last active {user.lastLogin}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <Shield className="h-5 w-5" />
                        <span>{user.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
                    >
                      Edit User
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-full max-w-md rounded-lg backdrop-blur-lg bg-white/10 border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Confirm Delete</h2>
            <p className="text-white/70 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;