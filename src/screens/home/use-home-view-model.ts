"use server"

import dayjs from "dayjs"

import type {
  Appointment,
  AppointmentPeriodGroup,
} from "@/shared/types/appointment"
import type { Appointment as PrismaAppointment } from "@/generated/prisma/client"

import { getAppointmentsAction } from "@/shared/actions/get-appointments-actions"
import { parseISO } from "date-fns"

export type UseHomeViewModelProps = {
  date?: string
}

export const useHomeViewModel = async ({ date }: UseHomeViewModelProps) => {
  const selectedDate = date ? parseISO(date) : dayjs().toDate()

  const fetchAppointments = async () => {
    try {
      const { appointments } = await getAppointmentsAction({
        date: selectedDate,
      })
      return appointments
    } catch (error) {
      console.error("Error fetching appointments:", error)
      return []
    }
  }

  const getPeriod = (hour: number) => {
    if (hour >= 9 && hour < 12) return "morning"

    if (hour >= 13 && hour < 18) return "afternoon"

    return "evening"
  }

  const groupAppointmentsByPeriod = (appointments: PrismaAppointment[]) => {
    const transformedAppointments: Appointment[] = appointments.map(
      (appointment) => ({
        ...appointment,
        time: dayjs(appointment.scheduleAt).format("HH:mm"),
        period: getPeriod(appointment.scheduleAt.getHours()),
      }),
    )

    const morningAppointments = transformedAppointments.filter(
      (appointment) => appointment.period === "morning",
    )
    const afternoonAppointments = transformedAppointments.filter(
      (appointment) => appointment.period === "afternoon",
    )
    const eveningAppointments = transformedAppointments.filter(
      (appointment) => appointment.period === "evening",
    )

    return [
      {
        title: "Manhã",
        type: "morning",
        timeRange: "9h-12h",
        appointments: morningAppointments,
      },
      {
        title: "Tarde",
        type: "afternoon",
        timeRange: "13h-18h",
        appointments: afternoonAppointments,
      },
      {
        title: "Noite",
        timeRange: "19h-21h",
        type: "evening",
        appointments: eveningAppointments,
      },
    ] as AppointmentPeriodGroup[]
  }

  const appointments = await fetchAppointments()

  return {
    groupedAppointments: groupAppointmentsByPeriod(appointments),
  }
}
