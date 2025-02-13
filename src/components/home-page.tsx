import { Toaster } from 'react-hot-toast';
import { CheckSquare } from 'lucide-react';
import AddTask from '../components/add-task.tsx';
import TaskFilters from '../components/task-filter.tsx';
import { useTasks } from '../hooks/use-tasks-hook.ts';
import {RenderContent} from "./render-content.tsx";

function HomePage() {
    const { tasks, handleCompleteAll, } = useTasks();

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
                    <RenderContent/>
                </div>
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
}

export default HomePage;