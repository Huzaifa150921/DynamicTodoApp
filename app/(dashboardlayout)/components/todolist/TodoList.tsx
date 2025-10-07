'use client';
import { useState, useEffect } from "react";
import styles from "./todo.module.css";
import { notifySuccess } from "@/app/components/uielements/toast/Notifier";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Shimmer from "@/app/(dashboardlayout)/components/shimmerscreen/ShimmerScreen";
type Task = {
    id: string;
    title: string;
    completed: boolean;
    description?: string;
    duedate?: string;
};

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [updateForm, setUpdateForm] = useState<boolean>(false);
    const [updateTitle, setUpdateTitle] = useState<string>("");
    const [updateDescription, setUpdateDescription] = useState<string>("");
    const [updateDueDate, setUpdateDueDate] = useState<string>("");
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    async function fetchTasks() {
        setLoading(true);
        try {
            const res = await fetch("/api/tasks", { cache: "reload" });
            if (res.ok) {
                const data: Task[] = await res.json();
                setTasks(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTasks(); }, []);

    async function handleDeleteTask(id: string) {
        const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        if (res.ok) {
            notifySuccess("Task deleted successfully");
            fetchTasks();
        }
    }

    async function handleUpdateTask(e: React.FormEvent) {
        e.preventDefault();
        if (!updateTitle.trim() || !currentTaskId) return;


        const dueDateISO = updateDueDate ? new Date(updateDueDate).toISOString() : undefined;

        const res = await fetch(`/api/tasks/${currentTaskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: updateTitle,
                description: updateDescription,
                duedate: dueDateISO,
            }),
        });

        if (res.ok) {
            notifySuccess("Task updated successfully");
            setUpdateForm(false);
            setUpdateTitle("");
            setUpdateDescription("");
            setUpdateDueDate("");
            setCurrentTaskId(null);
            fetchTasks();
        }
    }

    async function handleToggleComplete(id: string, completed: boolean) {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !completed }),
        });
        if (res.ok) {
            notifySuccess("Task status updated");
            fetchTasks();
        }
    }

    function showForm(task: Task) {
        setUpdateForm(true);
        setUpdateTitle(task.title);
        setUpdateDescription(task.description || "");


        const formattedDate = task.duedate ? task.duedate.split("T")[0] : "";
        setUpdateDueDate(formattedDate);

        setCurrentTaskId(task.id);
    }

    function closeForm() {
        setUpdateForm(false);
        setUpdateTitle("");
        setUpdateDescription("");
        setUpdateDueDate("");
        setCurrentTaskId(null);
    }

    return (
        <div className={styles.todo}>
            {loading ? (

                <Shimmer />
            ) : tasks.length ? (
                <div className={styles.todo_task_list}>
                    {tasks.map(task => (
                        <div key={task.id} className={`${styles.todo_task_item} ${task.completed ? styles.todo_completed_task : ""}`}>
                            <div className={styles.todo_task_labels}>
                                <div className={styles.todo_title}><strong>Title:</strong> {task.title}</div>
                                {task.duedate && <div className={styles.todo_date}><strong>Due Date:</strong> {task.duedate.split("T")[0]}</div>}
                                {task.description && <div className={styles.todo_description}><strong>Description:</strong> {task.description}</div>}
                            </div>
                            <div className={styles.todo_task_actions}>

                                {task.completed ?
                                    <IoIosCheckmarkCircleOutline className={styles.todo_completed_button} onClick={() => handleToggleComplete(task.id, task.completed)} size={50} color="green" /> :
                                    <IoIosCheckmarkCircleOutline className={styles.todo_complete_button} onClick={() => handleToggleComplete(task.id, task.completed)} size={50} color="blue" />

                                }

                                <FaRegEdit className={styles.todo_edit_button} onClick={() => showForm(task)} size={50} color="black" />

                                <MdDelete className={styles.todo_delete_button} onClick={() => handleDeleteTask(task.id)} size={50} color="red" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.todo_empty}>No tasks found</p>
            )}

            {updateForm && (
                <div className={styles.todo_updateform_overlay}>
                    <form className={styles.todo_updateform} onSubmit={handleUpdateTask}>
                        <input
                            className={styles.todo_updateforminput}
                            type="text"
                            value={updateTitle}
                            onChange={(e) => setUpdateTitle(e.target.value)}
                            placeholder="Update task..."
                        />
                        <input
                            className={styles.todo_updateforminput}
                            type="date"
                            value={updateDueDate}
                            onChange={(e) => setUpdateDueDate(e.target.value)}
                        />
                        <textarea
                            className={styles.todo_updateforminput}
                            value={updateDescription}
                            onChange={(e) => setUpdateDescription(e.target.value)}
                            placeholder="Update description..."
                        />
                        <div className={styles.todo_updateform_actions}>
                            <button type="submit" className={styles.todo_updateformbutton}>Update</button>
                            <button type="button" className={styles.todo_cancel_button} onClick={closeForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
