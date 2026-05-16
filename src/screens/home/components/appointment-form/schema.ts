import { z } from "zod"

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, "O nome do tutor é obrigatório"),
  petName: z.string().min(3, "O nome do pet é obrigatório"),
  phone: z.string().min(11, "O telefone é obrigatório"),
  description: z.string().min(3, "A descrição é obrigatória"),
})

type AppointmentFormData = z.infer<typeof appointmentFormSchema>

export { appointmentFormSchema, type AppointmentFormData }
