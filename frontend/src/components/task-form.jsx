import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
    const [title, setTitle] = useState(initialData ? initialData.title : '');
    const [description, setDescription] = useState(initialData ? initialData.description : '');
    const [status, setStatus] = useState(initialData ? initialData.status : 'pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, status });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Task' : 'Create New Task'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter task title"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="status">Status</FieldLabel>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </Field>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            onClick={onCancel}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {initialData ? 'Update Task' : 'Create Task'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
export default TaskForm;