"use client";

import React, { useState, useEffect } from "react";
import styles from "./todo.module.css";
import { notifySuccess, notifyError } from "@/app/components/uielements/toast/Notifier";


type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type Session = {
    user?: {
        name?: string | null;
    };
};

export default function TodoList({ session }: { session: Session }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [updateForm, setUpdateForm] = useState<boolean>(false);
    const [updateTitle, setUpdateTitle] = useState<string>("");
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    async function fetchTasks() {
        setLoading(true);
        const res = await fetch("/api/tasks");
        if (res.ok) {
            const data: Task[] = await res.json();
            setTasks(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    async function handleAddTask(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim()) return;

        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, completed: false }),
        });

        if (res.ok) {
            notifySuccess("Task added successfully");
            setTitle("");
            fetchTasks();
        }
    }

    async function handleDeleteTask(id: string) {
        const res = await fetch(`/api/tasks/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            notifySuccess("Task deleted successfully");
            fetchTasks();
        }
    }

    async function handleUpdateTask(e: React.FormEvent) {
        e.preventDefault();
        if (!updateTitle.trim() || !currentTaskId) return;

        const res = await fetch(`/api/tasks/${currentTaskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: updateTitle }),
        });

        if (res.ok) {
            notifySuccess("Task updated successfully");
            setUpdateForm(false);
            setUpdateTitle("");
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
        setCurrentTaskId(task.id);
    }

    function closeForm() {
        notifyError("Update cancelled");
        setUpdateForm(false);
        setUpdateTitle("");
        setCurrentTaskId(null);
    }

    return (
        <>
            <div className={styles.todo}>
                <h1 className={styles.todo_heading}>
                    Welcome! {session?.user?.name || "User"}
                </h1>

                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.todo_input}
                        placeholder="Enter task here..."
                    />
                    <button type="submit" className={styles.todo_add_button}>
                        Add Task
                    </button>
                </form>

                {loading ? (
                    <p>Loading tasks...</p>
                ) : tasks.length > 0 ? (
                    <div className={styles.todo_task_list}>
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`${styles.todo_task_item} ${task.completed ? styles.todo_completed_task : ""
                                    }`}
                            >
                                <span>{task.title}</span>
                                <div className={styles.todo_task_actions}>
                                    <button
                                        className={styles.todo_complete_button}
                                        onClick={() => handleToggleComplete(task.id, task.completed)}
                                    >
                                        {task.completed ? "Completed" : "Todo"}
                                    </button>
                                    <button
                                        className={styles.todo_edit_button}
                                        onClick={() => showForm(task)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className={styles.todo_delete_button}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tasks found</p>
                )}
            </div>

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
                        <div className={styles.todo_updateform_actions}>
                            <button type="submit" className={styles.todo_updateformbutton}>
                                Update
                            </button>
                            <button
                                type="button"
                                className={styles.todo_cancel_button}
                                onClick={closeForm}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
