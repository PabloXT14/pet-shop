"use server"

import type {
  Appointment,
  AppointmentPeriodGroup,
} from "@/shared/types/appointment"
import type { Appointment as PrismaAppointment } from "@/generated/prisma/client"

import { getAppointmentsService } from "@/shared/services/appointment-service"

export const useHomeViewModel = async () => {
  const fetchAppointments = async () => {
    const { appointments } = await getAppointmentsService()

    return appointments
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
        time: appointment.scheduleAt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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
