import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task.ts';

interface TaskState {
    tasks: Task[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filter: 'all' | 'completed' | 'active';
    page: number;
    hasMore: boolean;
}

const initialState: TaskState = {
    tasks: [],
    status: 'idle',
    error: null,
    filter: 'all',
    page: 1,
    hasMore: true,
};

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (page: number, { dispatch }) => {
        const limit = 20;
        const start = (page - 1) * limit;

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/todos`, {
                    params: {
                        _start: start,
                        _limit: limit
                    }
                }
            );

            const data = response.data;
            dispatch(incrementPage()); // Incrémente la page après une requête réussie

            return {
                tasks: data,
                hasMore: data.length === limit,
                page
            };
        } catch (error) {
            if(error instanceof Error) {
                throw new Error('Failed to fetch tasks');
            }
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        completeAllTasks: (state) => {
            state.tasks = state.tasks.map(task => ({ ...task, completed: true }));
        },
        setFilter: (state, action: PayloadAction<'all' | 'completed' | 'active'>) => {
            state.filter = action.payload;
        },
        resetPage: (state) => {
            state.page = 1;
            state.hasMore = true;
        },
        incrementPage: (state) => {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = state.page === 1 ? 'loading' : 'succeeded';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const tasksMap = new Map(state.tasks.map(task => [task.id, task]));
                action.payload?.tasks.forEach((task : Task) => {
                    tasksMap.set(task.id, task);
                });
                state.tasks = Array.from(tasksMap.values());
                state.hasMore = action.payload?.hasMore ?? false;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch tasks';
            });
    },
});

export const {
    addTask,
    deleteTask,
    toggleTask,
    completeAllTasks,
    setFilter,
    resetPage,
    incrementPage
} = taskSlice.actions;

export default taskSlice.reducer;