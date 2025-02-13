import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../controller/task-slice.ts';
import toast from 'react-hot-toast';

export const useAddTask = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);

    const handleSubmit = useCallback((e: FormEvent) => {
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