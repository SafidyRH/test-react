import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../controller/task-slice.ts';
import toast from 'react-hot-toast';
import { Task } from '../types/task';

export const useTaskItem = (task: Task) => {
    const dispatch = useDispatch();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        document.body.style.overflow = showDeleteConfirm ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showDeleteConfirm]);

    const handleToggleTask = useCallback(() => {
        dispatch(toggleTask(task.id));
    }, [dispatch, task.id]);

    const handleDelete = useCallback(() => {
        dispatch(deleteTask(task.id));
        toast.success('Task deleted successfully');
        setShowDeleteConfirm(false);
    }, [dispatch, task.id]);

    return {
        showDeleteConfirm,
        setShowDeleteConfirm,
        handleToggleTask,
        handleDelete
    };
};