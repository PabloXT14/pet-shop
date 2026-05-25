import { z } from "zod"
import dayjs from "dayjs"

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, "O nome do tutor é obrigatório"),
  petName: z.string().min(3, "O nome do pet é obrigatório"),
  phone: z.string().min(15, "O telefone é obrigatório"),
  description: z.string().min(3, "A descrição é obrigatória"),
  scheduleAt: z
    .date({
      error: "A data é obrigatória",
    })
    .min(dayjs().startOf("day").toDate(), "A data deve ser no futuro"),
})

type AppointmentFormData = z.infer<typeof appointmentFormSchema>

export { appointmentFormSchema, type AppointmentFormData }
