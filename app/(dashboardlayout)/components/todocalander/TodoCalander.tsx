'use client'
import React from 'react'
import {
    Calendar as BigCalendar,
    CalendarProps,
    momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
const TodoCalander = (props: Omit<CalendarProps, "localizer">) => {
    const localizer = momentLocalizer(moment);
    return (

        <BigCalendar {...props} localizer={localizer} />

    )
}

export default TodoCalander