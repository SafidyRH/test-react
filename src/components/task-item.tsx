import { forwardRef } from 'react';
import { Task } from '../types/task';
import { Trash2, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { useTaskItem } from '../hooks/use-task-item.ts';

interface TaskItemProps {
    task: Task;
    isRecent?: boolean;
}

const TaskItem = forwardRef<HTMLDivElement, TaskItemProps>(({ task, isRecent }, ref) => {
    const {
        showDeleteConfirm,
        setShowDeleteConfirm,
        handleToggleTask,
        handleDelete
    } = useTaskItem(task);

    return (
        <>
            <div className="relative" ref={ref}>
                <div className={`flex items-center justify-between p-4 mb-2 rounded-lg border transition-all duration-200 ${
                    task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                } ${isRecent ? 'border-blue-300 shadow-md' : ''}`}>
                    <div className="flex items-center space-x-3 flex-1">
                        <button
                            onClick={handleToggleTask}
                            className="text-gray-500 hover:text-green-600 transition-colors"
                        >
                            {task.completed ? (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                                <Circle className="w-6 h-6" />
                            )}
                        </button>
                        <div className="flex-1">
                            <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                                {task.title}
                            </span>
                            {isRecent && (
                                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                                    New
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {showDeleteConfirm && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        onClick={() => setShowDeleteConfirm(false)}
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                                <h3 className="text-lg font-semibold text-gray-900">Delete Task</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this task? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
});

export default TaskItem;