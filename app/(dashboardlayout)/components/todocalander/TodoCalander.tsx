'use client'
import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
} from "react-big-calendar"
import moment from "moment"

const localizer = momentLocalizer(moment)


const TodoCalander = <TEvent extends object>(props: Omit<CalendarProps<TEvent>, "localizer">) => {
    return <BigCalendar {...props} localizer={localizer} />
}

export default TodoCalander
