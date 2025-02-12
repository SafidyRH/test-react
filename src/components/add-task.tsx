import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useAddTask } from '../hooks/use-add-task.ts';

const AddTask: React.FC = () => {
    const { title, handleTitleChange, handleSubmit } = useAddTask();

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Add a new task..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default AddTask;