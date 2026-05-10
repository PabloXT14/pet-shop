import type { Appointment as PrismaAppointment } from "@/generated/prisma/client"

export const APPOINTMENTS: PrismaAppointment[] = [
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
