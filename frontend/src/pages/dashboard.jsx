import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TaskCard from '@/components/task-card';
import TaskForm from '@/components/task-form';
import Cookies from 'js-cookie';
import { getCurrentUser } from "@/services/authService";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "@/services/taskService";
export function Dashboard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [user, setUser] = useState(null); // Add state for user

    // Fetch all tasks
    useEffect(() => {
        const initData = async () => {
            setLoading(true);
            await Promise.all([fetchTasks(), fetchUserInfo()]);
            setLoading(false);
        };
        initData();
    }, []);
    const fetchUserInfo = async () => {
        try {
            const response = await getCurrentUser();
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching user info:', error);
            // If user info fails, the token might be invalid
            Cookies.remove('jwt');
            navigate('/login');
        }
    };
    // const fetchTask = async (id) => {
    //     try {
    //         setLoading(true);
    //         const response = await getTask(id);
    //         return response.data.data.task;
    //     } catch (error) {
    //         console.error('Error fetching task:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await getTasks();
            setTasks(response.data.tasks || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (newTask) => {
        try {
            setLoading(true);
            const response = await createTask(newTask);
            setTasks([...tasks, response.data.task]);
            setShowForm(false);
        } catch (error) {
            console.error('Error creating task:', error);
        } finally {
            setLoading(false);
        }
    };

    // const handleUpdateTask = async (updatedTask) => {
    //     try {
    //         setLoading(true);
    //         const response = await updateTask(updatedTask.id, updatedTask);
    //         setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    //         setEditingTask(null);
    //         setShowForm(false);
    //     } catch (error) {
    //         console.error('Error updating task:', error);
    //     } finally {
    //         setLoading(false);
    //     }
        
    // };

    const handleDeleteTask = async (taskId) => {
        // Standard 2025 UX: Ask before deleting
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            setLoading(true);
            await deleteTask(taskId);
            // ONLY update state inside 'try'
            setTasks(prev => prev.filter(t => t.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove('jwt');
        navigate('/login');
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Task Manager</h1>
                    <div className="flex items-center gap-4">
                        {user && <span className="text-sm text-slate-500">Hello, {user.username}</span>}
                        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                            <LogOut size={18} /> Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Action Bar */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">My Tasks</h2>
                        <p className="text-slate-600 mt-1">{tasks.length} tasks</p>
                    </div>
                    <Button
                        onClick={() => {
                            setEditingTask(null);
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Create Task
                    </Button>
                </div>

                {/* Task Form Modal */}
                {showForm && (
                    <Card className="mb-8 bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TaskForm
                                onSuccess={editingTask ? handleUpdateTask : handleCreateTask}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingTask(null);
                                }}
                                initialTask={editingTask}
                            />
                        </CardContent>
                    </Card>
                )}

                {/* Tasks Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <p className="text-slate-600">Loading tasks...</p>
                    </div>
                ) : tasks.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <p className="text-slate-600 text-lg">No tasks yet. Create one to get started!</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={() => {
                                    setEditingTask(task);
                                    setShowForm(true);
                                }}
                                onDelete={() => handleDeleteTask(task.id)}
                                onRefresh={fetchTasks}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};