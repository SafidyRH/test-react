import {ClipboardList, Loader2} from "lucide-react";
import TaskItem from "./task-item.tsx";
import { useTasks } from "../hooks/use-tasks-hook.ts";

export const RenderContent = () => {
    const {tasks, status, error, hasMore, ref, filteredTasks} = useTasks();
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