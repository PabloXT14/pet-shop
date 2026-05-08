import type { Appointment as PrismaAppointment } from "@/generated/prisma/client"
import type {
  Appointment,
  AppointmentPeriodGroup,
} from "@/shared/types/appointment"

const APPOINTMENTS: PrismaAppointment[] = [
  {
    id: "1",
    petName: "Rex",
    description: "Banho e tosa",
    tutorName: "João Silva",
    phone: "11987654321",
    scheduleAt: new Date("2024-06-01T10:00:00"),
  },
  {
    id: "2",
    petName: "Luna",
    description: "Consulta veterinária",
    tutorName: "Maria Oliveira",
    phone: "11912345678",
    scheduleAt: new Date("2024-06-01T14:00:00"),
  },
  {
    id: "3",
    petName: "Max",
    description: "Vacina",
    tutorName: "Pedro Santos",
    phone: "11998765432",
    scheduleAt: new Date("2024-06-01T16:00:00"),
  },
  {
    id: "4",
    petName: "Luna",
    description: "Consulta veterinária",
    tutorName: "Maria Oliveira",
    phone: "11912345678",
    scheduleAt: new Date("2024-06-01T14:00:00"),
  },
  {
    id: "5",
    petName: "Max",
    description: "Vacina",
    tutorName: "Pedro Santos",
    phone: "11998765432",
    scheduleAt: new Date("2024-06-01T19:00:00"),
  },
]

export const useHomeViewModel = () => {
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

  return {
    groupedAppointments: groupAppointmentsByPeriod(APPOINTMENTS),
  }
}
