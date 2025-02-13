import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetPage, fetchTasks } from '../controller/task-slice.ts';
import type { RootState, AppDispatch } from '../store/store';

export const useTaskFilters = () => {
    const dispatch: AppDispatch = useDispatch();
    const currentFilter = useSelector((state: RootState) => state.tasks.filter);

    const handleFilterChange = useCallback((filter: 'all' | 'completed' | 'active') => {
        dispatch(setFilter(filter));
        dispatch(resetPage());
        dispatch(fetchTasks(1));
    }, [dispatch]);

    return {
        currentFilter,
        handleFilterChange
    };
};