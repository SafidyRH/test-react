import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchTasks, completeAllTasks } from '../controller/task-slice.ts';
import { useInView } from 'react-intersection-observer';

export const useTasks = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, status, error, filter, hasMore, page } = useSelector((state: RootState) => state.tasks);
    const { ref, inView } = useInView();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks(1));
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (inView && hasMore && status === 'succeeded') {
            dispatch(fetchTasks(page + 1));
        }
    }, [inView, hasMore, status, dispatch, page]);

    const handleCompleteAll = useCallback(() => {
        dispatch(completeAllTasks());
    }, [dispatch]);

    const filteredTasks = useMemo(() => {
        const recentTasks = tasks.filter(task => task.id > 1000000);
        const olderTasks = tasks.filter(task => task.id <= 1000000);

        const filterFn = (task: typeof tasks[0]) => {
            if (filter === 'completed') return task.completed;
            if (filter === 'active') return !task.completed;
            return true;
        };

        return {
            recent: recentTasks.filter(filterFn),
            older: olderTasks.filter(filterFn)
        };
    }, [tasks, filter]);

    return {
        tasks,
        status,
        error,
        filter,
        hasMore,
        page,
        ref,
        inView,
        handleCompleteAll,
        filteredTasks
    };
};