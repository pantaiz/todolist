import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskType} from "./Todolist";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {

    changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('removeTask'),
    task: {
        id: 'asd',
        title: 'strsing',
        isDone: true,
    },
    todolistId: 'string',
}
    }



export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {
            id: 'asd',
            title: 'strsing',
            isDone: true,
        },

    },
};
export const TaskStoryаFalse: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {
            id: 'asd',
            title: 'strsing',
            isDone: false,
        },

    },
};

