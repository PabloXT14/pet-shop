import { z } from "zod"
import dayjs from "dayjs"

const appointmentFormSchema = z
  .object({
    tutorName: z
      .string({
        error: "O nome do tutor é obrigatório",
      })
      .min(3, "O nome do tutor é obrigatório"),
    petName: z
      .string({
        error: "O nome do pet é obrigatório",
      })
      .min(3, "O nome do pet é obrigatório"),
    phone: z
      .string({
        error: "O telefone é obrigatório",
      })
      .min(15, "O telefone é obrigatório"),
    description: z
      .string({
        error: "A descrição é obrigatória",
      })
      .min(3, "A descrição é obrigatória"),
    date: z
      .date({
        error: "A data é obrigatória",
      })
      .min(dayjs().startOf("day").toDate(), "A data deve ser no futuro"),
    time: z
      .string({
        error: "O horário é obrigatório",
      })
      .min(1, "O horário é obrigatório"),
  })
  .refine(
    (data) => {
      if (!data.date || !data.time) return true

      const [hours, minutes] = data.time.split(":").map(Number)

      const selectedDateTime = dayjs(data.date).hour(hours).minute(minutes)

      return selectedDateTime.isAfter(dayjs())
    },
    {
      path: ["time"],
      error: "O horário deve ser no futuro",
    },
  )

type AppointmentFormData = z.infer<typeof appointmentFormSchema>

export { appointmentFormSchema, type AppointmentFormData }
