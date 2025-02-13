import { Toaster } from 'react-hot-toast';
import { Loader2, ClipboardList, CheckSquare } from 'lucide-react';
import TaskItem from '../components/task-item.tsx';
import AddTask from '../components/add-task.tsx';
import TaskFilters from '../components/task-filter.tsx';
import { useTasks } from '../hooks/use-tasks-hook.ts';

function HomePage() {
    const {
        tasks,
        status,
        error,
        hasMore,
        ref,
        handleCompleteAll,
        filteredTasks
    } = useTasks();

    const renderContent = () => {
        if (status === 'loading' && tasks.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <p className="mt-2 text-gray-600">Loading tasks...</p>
                </div>
            );
        }

        if (status === 'failed') {
            return (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    <p>Error: {error}</p>
                </div>
            );
        }

        if (filteredTasks.recent.length === 0 && filteredTasks.older.length === 0) {
            return (
                <div className="text-center py-12">
                    <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No tasks found. Add your first task above!</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {filteredTasks.recent.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Recently Added
                        </h3>
                        {filteredTasks.recent.map((task) => (
                            <TaskItem key={task.id} task={task} isRecent={true} />
                        ))}
                    </div>
                )}

                {filteredTasks.older.length > 0 && (
                    <div className="space-y-2">
                        {filteredTasks.recent.length > 0 && (
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                Other Tasks
                            </h3>
                        )}
                        {filteredTasks.older.map((task, index) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                ref={index === filteredTasks.older.length - 3 ? ref : undefined}
                            />
                        ))}
                    </div>
                )}

                {status === 'succeeded' && hasMore && (
                    <div className="py-4 text-center">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
                    <p className="text-gray-600">Manage your tasks efficiently</p>
                </div>

                <AddTask />

                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="mb-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {tasks.length} tasks
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-1 sm:space-x-2">
                            <TaskFilters />
                            <button
                                onClick={handleCompleteAll}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <CheckSquare className="w-4 h-4" />
                                Complete All
                            </button>
                        </div>
                    </div>

                    {renderContent()}
                </div>
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
}

export default HomePage;