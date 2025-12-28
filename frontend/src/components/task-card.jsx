import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit } from 'lucide-react';

// Destructure the props here: { task, onEdit, onDelete }
const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
                <div className="flex gap-2">
                    {/* Edit Button */}
                    <Button variant="ghost" size="icon" onClick={onEdit}>
                        <Edit size={18} className="text-slate-500" />
                    </Button>
                    {/* Delete Button */}
                    <Button variant="ghost" size="icon" onClick={onDelete}>
                        <Trash2 size={18} className="text-red-500" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-slate-600">
                    {task.description || "No description provided."}
                </CardDescription>
                <div className="mt-4">
                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-600">
                        {task.status || 'Pending'}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export default TaskCard;
