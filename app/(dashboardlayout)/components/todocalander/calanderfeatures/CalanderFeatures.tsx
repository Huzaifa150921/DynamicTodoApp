'use client'
import styles from './calanderfeature.module.css'
import { useEffect, useState } from 'react'
import moment from "moment";
import TodoCalander from '@/app/(dashboardlayout)/components/todocalander/TodoCalander'
import CreateTaskDialog from '@/app/(dashboardlayout)/components/createtaskdialog/CreateTaskDialog';
import { EventProps, SlotInfo } from 'react-big-calendar'

type Task = {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  duedate?: string;
};


type CalendarEvent = {
  start: Date;
  end: Date;
  title: string;
  description?: string;
  completed: boolean;
  id: string;
  data?: { type: string };
};

const CalanderFeatures = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks", { cache: "reload" });
      if (res.ok) {
        const data: Task[] = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { fetchTasks(); }, []);

  const events: CalendarEvent[] = tasks
    .filter(task => task.duedate)
    .map(task => ({
      start: moment(task.duedate).toDate(),
      end: moment(task.duedate).toDate(),
      title: task.title,
      description: task.description || "",
      completed: task.completed,
      id: task.id,
      allDay: true,
      data: { type: "Task" }
    }));


  const components = {
    event: ({ event }: EventProps<CalendarEvent>) => {
      const date = moment(event.start).format("MMM DD, YYYY");
      const bgColor = event.completed ? "#29b100d2" : "#db0000cc";

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


  const handleSlotSelect = (slotInfo: SlotInfo) => {
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
