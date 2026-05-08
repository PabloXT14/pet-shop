import type { Appointment as PrismaAppointment } from "@/generated/prisma/client"

export type AppointmentDayPeriod = "morning" | "afternoon" | "evening"

export type Appointment = PrismaAppointment & {
  time: string
  period: AppointmentDayPeriod
}

export type AppointmentPeriodGroup = {
  title: string
  timeRange: string
  type: AppointmentDayPeriod
  appointments: Appointment[]
}
