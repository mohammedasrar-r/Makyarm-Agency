import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Calendar, X, ChevronDown, Filter, List, GridIcon } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const TasksPage = () => {
  // Sample initial tasks data
  const initialTasks = [
    { id: 1, title: 'Complete website redesign', deadline: '2025-05-15', status: 'Pending', priority: 'High' },
    { id: 2, title: 'Social media campaign launch', deadline: '2025-05-10', status: 'Pending', priority: 'Medium' },
    { id: 3, title: 'Client proposal review', deadline: '2025-05-07', status: 'Completed', priority: 'High' },
    { id: 4, title: 'Team weekly meeting', deadline: '2025-05-05', status: 'Completed', priority: 'Low' },
    { id: 5, title: 'SEO optimization for client website', deadline: '2025-05-20', status: 'Pending', priority: 'Medium' },
    { id: 6, title: 'Update analytics dashboard', deadline: '2025-05-12', status: 'Pending', priority: 'Low' },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Function to toggle task status
  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' } 
        : task
    ));
  };

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining or overdue
  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const timeDiff = dueDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
      return `${Math.abs(daysDiff)} days overdue`;
    } else if (daysDiff === 0) {
      return "Due today";
    } else {
      return `${daysDiff} days remaining`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Task <span style={{ color: '#3AB4F2' }}>Management</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Track, organize, and complete your tasks efficiently
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          {/* View toggle */}
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow p-2">
            <button 
              onClick={() => setViewMode('grid')} 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            >
              <GridIcon size={20} />
            </button>
            <button 
              onClick={() => setViewMode('table')} 
              className={`p-2 rounded ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'}`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Filters */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-white rounded-lg shadow px-4 py-2"
            >
              <Filter size={18} />
              <span>Filter Tasks</span>
              <ChevronDown size={16} />
            </button>

            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X size={16} />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                  >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select 
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm text-sm"
                  >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Task count summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTasks.length} tasks 
            {filterStatus !== 'All' && ` • Status: ${filterStatus}`}
            {filterPriority !== 'All' && ` • Priority: ${filterPriority}`}
          </p>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                    task.status === 'Completed' 
                      ? 'border-green-500' 
                      : task.priority === 'High' 
                        ? 'border-red-500' 
                        : task.priority === 'Medium' 
                          ? 'border-yellow-500' 
                          : 'border-blue-500'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className={`font-bold text-lg ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {task.title}
                      </h3>
                      <span 
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          task.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : task.priority === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-2">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{formatDate(task.deadline)}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm">{getDaysRemaining(task.deadline)}</span>
                    </div>
                    
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`w-full py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center ${
                        task.status === 'Completed'
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                      style={{ backgroundColor: task.status === 'Completed' ? '#f3f4f6' : '#3AB4F2' }}
                    >
                      <CheckCircle size={18} className="mr-2" />
                      {task.status === 'Completed' ? 'Completed' : 'Mark as Done'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredTasks.map((task) => (
                      <motion.tr 
                        key={task.id}
                        initial={{ opacity: 0, backgroundColor: "#f3f9ff" }}
                        animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <p className={`font-medium ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{task.title}</p>
                            <p className="text-xs text-gray-500">{getDaysRemaining(task.deadline)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-2 text-gray-400" />
                            <span className="text-sm text-gray-500">{formatDate(task.deadline)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              task.priority === 'High' 
                                ? 'bg-red-100 text-red-800' 
                                : task.priority === 'Medium' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              task.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => toggleTaskStatus(task.id)}
                            className={`py-1 px-3 rounded text-sm transition-colors duration-200 ${
                              task.status === 'Completed'
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                : 'text-white'
                            }`}
                            style={{ backgroundColor: task.status === 'Completed' ? '#f3f4f6' : '#3AB4F2' }}
                          >
                            {task.status === 'Completed' ? 'Completed' : 'Mark as Done'}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {filteredTasks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <List size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
            <p className="mt-1 text-gray-500">
              Try changing your filter settings or adding new tasks.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;