'use client'
import styles from './calanderfeature.module.css'
import React, { useEffect, useState } from 'react'
import moment from "moment";
import TodoCalander from '@/app/(dashboardlayout)/components/todocalander/TodoCalander'
import CreateTaskDialog from '@/app/(dashboardlayout)/components/createtaskdialog/CreateTaskDialog';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  duedate?: string;
};

const CalanderFeatures = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  async function fetchTasks() {

    try {
      const res = await fetch("/api/tasks", { cache: "reload" });
      if (res.ok) {
        const data: Task[] = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error(err);
    } finally {

    }
  }

  useEffect(() => { fetchTasks(); }, []);

  const events = tasks
    .filter(task => task.duedate)
    .map(task => ({
      start: moment(task.duedate).toDate(),
      end: moment(task.duedate).toDate(),
      title: task.title,
      description: task.description || "",
      completed: task.completed,
      id: task.id,
      data: { type: "Task" }
    }));

  const components = {
    event: (props: any) => {
      const { event } = props;
      const date = moment(event.start).format("MMM DD, YYYY");
      const bgColor = event.completed ? "green" : "red";

      return (
        <div className={styles.calanderfeatures} style={{ backgroundColor: bgColor }}>
          <strong>{event.title}</strong>
          {event.description && (
            <div className={styles.calanderfeature_description}>{event.description}</div>
          )}
          <div className={styles.calanderfeature_date}>{date}</div>
        </div>
      );
    },
  };

  const handleSlotSelect = (slotInfo: any) => {
    const clickedDate = moment(slotInfo.start).format("YYYY-MM-DD");
    setSelectedDate(clickedDate);
    setShowDialog(true);
  };

  const handleTaskAdded = () => fetchTasks();

  return (
    <div className={styles.scrollableCalendar}>
      <TodoCalander
        events={events}
        components={components}
        onSelectSlot={handleSlotSelect}
        selectable
        popup
      />

      <CreateTaskDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        date={selectedDate}
        onTaskAdded={handleTaskAdded}
      />
    </div>
  )
}

export default CalanderFeatures
