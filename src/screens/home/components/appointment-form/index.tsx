"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

import { type AppointmentFormData, appointmentFormSchema } from "./schema"

export const AppointmentForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: "",
      petName: "",
      phone: "",
      description: "",
    },
  })

  const onSubmit = (data: AppointmentFormData) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand" type="button" className="uppercase">
          Novo agendamento
        </Button>
      </DialogTrigger>

      <DialogContent variant="appointment">
        <DialogHeader>
          <DialogTitle size="modal">Agende um atendimento</DialogTitle>

          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} id="appointment-form">
          <input {...register("tutorName")} placeholder="Nome do tutor" />
        </form>

        <Button
          form="appointment-form"
          type="submit"
          variant="brand"
          className="ml-auto w-fit uppercase"
        >
          Agendar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
