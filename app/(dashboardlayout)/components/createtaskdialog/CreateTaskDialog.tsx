import { useState } from 'react';
import styles from './createtaskdialog.module.css'
import { notifyError, notifySuccess } from '@/app/components/uielements/toast/Notifier';

type CreateTaskDialogProps = {
    showDialog: boolean
    setShowDialog: (val: boolean) => void
    date?: string;
    onTaskAdded?: () => void
}

const CreateTaskDialog = ({ showDialog, setShowDialog, date, onTaskAdded }: CreateTaskDialogProps) => {

    const [title, setTitle] = useState<string>("");
    const [dateState, setDate] = useState<string>(date || "");
    const [description, setDescription] = useState<string>("");

    async function handleAddTask(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim() || !(date || dateState)) return;
        const dueDateISO = new Date(dateState || date!).toISOString();
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                { title, completed: false, duedate: dueDateISO, description }),
        });
        if (res.ok) {
            notifySuccess("Task added successfully");
            if (onTaskAdded) onTaskAdded();
            setTitle("");
            setDate("");
            setDescription("");
            setShowDialog(false);
        }
    }

    function handleCancelTask() {
        setTitle("");
        setDate("");
        setDescription("");
        setShowDialog(false);
        notifyError("Task not added");
    }

    return (
        <>
            {showDialog && (
                <div className={styles.dialog_overlay}>
                    <div className={styles.addtask_dialog}>
                        <h3 className={styles.dialog_heading}>Add Task</h3>
                        <form className={styles.dialog_form} onSubmit={handleAddTask}>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Title..."
                                className={styles.dialog_input}
                                required
                            />
                            <input
                                type="date"
                                className={styles.dialog_date}
                                value={date || dateState}
                                readOnly={!!date}
                                name='duedate'
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Enter Description..."
                                className={styles.dialog_textarea}
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            <div className={styles.dialog_btnflex}>
                                <button
                                    type="submit"
                                    className={styles.dialog_addbtn}
                                    disabled={!title.trim() || !(date || dateState)}
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    className={styles.dialog_cancelbtn}
                                    onClick={handleCancelTask}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default CreateTaskDialog;
