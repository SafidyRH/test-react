import { FC } from "react";
import { useTaskFilters } from '../hooks/use-task-filters.ts';


const TaskFilters: FC = () => {
    const { currentFilter, handleFilterChange } = useTaskFilters();

    return (
        <div className="flex gap-2">
            {(['all', 'active', 'completed'] as const).map((filter) => (
                <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        currentFilter === filter
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default TaskFilters;