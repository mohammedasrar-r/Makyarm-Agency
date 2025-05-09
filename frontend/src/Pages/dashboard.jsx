import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/submissions');
        const allTasks = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTasks(allTasks);
        updateCounts(allTasks);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchTasks();
  }, []);

  const updateCounts = (tasks) => {
    setTotalTasks(tasks.length);
    setCompletedTasks(tasks.filter((t) => t.status === 'Completed').length);
    setPendingTasks(tasks.filter((t) => t.status !== 'Completed').length);
  };

  const handleMarkComplete = async (id) => {
    try {
      const res = await axios.patch(`https://makyarmagenciespvt-backend.vercel.app/api/user/submissions/${id}/status`, {
        status: 'Completed',
      });
  
      const updatedTasks = tasks.map((task) =>
        task._id === id ? res.data : task
      );
      setTasks(updatedTasks);
      updateCounts(updatedTasks);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Good Evening, Abdul Khaleel</h2>
      <p className="text-gray-600 mb-6">Here's what's happening with your tasks today.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Tasks" count={totalTasks} icon="📥" color="blue" />
        <StatCard label="Completed Tasks" count={completedTasks} icon="✅" color="green" />
        <StatCard label="Pending Tasks" count={pendingTasks} icon="🕒" color="yellow" />
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">All Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks found.</p>
        ) : (
          <table className="min-w-full table-auto text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{task.name}</td>
                  <td className="px-4 py-2">{task.email}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm ${
                      task.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-white" />
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{new Date(task.date).toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700 break-words whitespace-normal max-w-xs">
  {task.message}
</td>
                  <td className="px-4 py-2">
                    {task.status !== 'Completed' && (
                      <button
                        onClick={() => handleMarkComplete(task._id)}
                        className="bg-green-500 hover:cursor-pointer hover:bg-green-700 text-white text-sm px-2 py-1 rounded"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, count, icon, color }) => {
  const bgColor = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  }[color];

  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
      <div className={`p-3 rounded-full text-2xl ${bgColor}`}>{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-xl font-bold">{count}</div>
      </div>
    </div>
  );
};

export default Dashboard;
