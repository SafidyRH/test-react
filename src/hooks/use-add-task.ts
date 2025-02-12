import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/task-slice';
import toast from 'react-hot-toast';

export const useAddTask = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Please enter a task title');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: title.trim(),
            completed: false,
            userId: 1,
        };

        dispatch(addTask(newTask));
        setTitle('');
        toast.success('Task added successfully');
    }, [title, dispatch]);

    return {
        title,
        handleTitleChange,
        handleSubmit
    };
};