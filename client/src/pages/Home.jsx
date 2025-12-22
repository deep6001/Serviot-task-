import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../Axios/Axios";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Plus,
    Trash2,
    Pencil,
    ClipboardList,
} from "lucide-react";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [deleteTask, setDeleteTask] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "pending", // default
    });

    const fetchTasks = async () => {
        try {
            const res = await axiosInstance.get("/api/task");
            setTasks(res.data || res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // ---------------- CREATE / UPDATE ----------------
    const handleSubmit = async () => {
        try {
            if (editTask) {
                await axiosInstance.put(`/api/task/${editTask._id}`, form);
            } else {
                await axiosInstance.post("/api/task", form);
            }

            setOpen(false);
            setEditTask(null);
            setForm({ title: "", description: "" });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };
    const statusStyles = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
        "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
        completed: "bg-green-100 text-green-800 border-green-200",
    };

    // ---------------- DELETE ----------------
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/api/task/${deleteTask._id}`);
            setDeleteTask(null);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
                {/* Header */}
                <div className="flex items-center justify-between max-w-6xl mx-auto mb-6">
                    <div className="flex items-center gap-3">
                        <ClipboardList className="w-7 h-7 text-primary" />
                        <h1 className="text-3xl font-bold">Your Tasks</h1>
                    </div>

                    <Button
                        className="gap-2"
                        onClick={() => {
                            setEditTask(null);
                            setForm({ title: "", description: "" });
                            setOpen(true);
                        }}
                    >
                        <Plus size={18} />
                        Create Task
                    </Button>
                </div>

                {/* Task Grid */}
                <div className="grid gap-6 max-w-6xl mx-auto sm:grid-cols-2 lg:grid-cols-3">
                    {loading &&
                        Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i}>
                                <CardContent className="space-y-3 pt-6">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-full" />
                                    <Skeleton className="h-3 w-2/3" />
                                </CardContent>
                            </Card>
                        ))}

                    {!loading &&
                        tasks.map((task) => (
                            <Card
                                key={task._id}
                                className="hover:shadow-xl transition-all duration-300"
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">
                                            {task.title}
                                        </CardTitle>

                                        <Badge
                                            variant="outline"
                                            className={statusStyles[task.status] || statusStyles.pending}
                                        >
                                            {task.status || "pending"}
                                        </Badge>

                                    </div>

                                    <CardDescription className="line-clamp-2">
                                        {task.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            setEditTask(task);
                                            setForm({
                                                title: task.title,
                                                description: task.description,
                                            });
                                            setOpen(true);
                                        }}
                                    >
                                        <Pencil size={16} />
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => setDeleteTask(task)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                </div>

                {/* Empty State */}
                {!loading && tasks.length === 0 && (
                    <div className="text-center mt-20 text-muted-foreground">
                        <ClipboardList className="mx-auto mb-3 w-10 h-10" />
                        <p>No tasks yet. Create your first task 🚀</p>
                    </div>
                )}
            </div>

            {/* CREATE / EDIT MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editTask ? "Edit Task" : "Create Task"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input
                            placeholder="Task title"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                        />

                        <Textarea
                            placeholder="Task description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />

                        {/* STATUS — ONLY IN EDIT MODE */}
                        {editTask && (
                            <Select
                                value={form.status}
                                onValueChange={(value) =>
                                    setForm({ ...form, status: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    <DialogFooter>
                        <Button onClick={handleSubmit}>
                            {editTask ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* DELETE CONFIRM */}
            <AlertDialog open={!!deleteTask}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete this task?
                        </AlertDialogTitle>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setDeleteTask(null)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
