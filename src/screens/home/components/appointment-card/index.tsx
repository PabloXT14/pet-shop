"use client"

import { useState } from "react"
import dayjs from "dayjs"
import { Pen as PenIcon, TrashBin2 } from "@solar-icons/react/ssr"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"

import { AppointmentForm } from "../appointment-form"
import { Button } from "@/shared/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"

import { deleteAppointmentAction } from "@/shared/actions/delete-appointment-action"

import type { Appointment } from "@/shared/types/appointment"

type AppointmentCardProps = {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    const result = await deleteAppointmentAction(appointment.id)

    if (result.success) {
      toast.success("Agendamento excluído com sucesso")
    } else {
      toast.error(
        result.error ||
          "Erro ao excluir agendamento. Tente novamente mais tarde.",
      )
    }

    setIsDeleting(false)
  }

  return (
    <div className="w-full not-last:border-border-divisor not-last:border-b">
      {/* CONTENT */}
      <div className="flex w-full flex-col gap-2 p-3 md:h-12 md:flex-row md:items-center md:gap-4 md:px-3 md:py-0">
        {/* TEXTS */}
        <div className="flex w-full flex-col md:flex-1 md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-3 md:flex-1 md:gap-4">
            <span className="text-label-medium">
              {dayjs(appointment.scheduleAt).format("HH:mm")}
            </span>

            <p className="line-clamp-1 text-content-secondary text-paragraph-small">
              <span className="text-content-primary text-label-small">
                {appointment.petName}
              </span>
              <span className="text-content-secondary text-paragraph-small">
                {" "}
                / {appointment.tutorName}
              </span>
            </p>
          </div>

          <p className="text-content-secondary text-paragraph-small md:line-clamp-1 md:flex-1">
            {appointment.description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <AppointmentForm appointment={appointment}>
            <Button variant="edit" size="icon" title="Editar agendamento">
              <PenIcon weight="Bold" size={16} />
            </Button>
          </AppointmentForm>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="remove" size="icon" title="Excluir agendamento">
                <TrashBin2 weight="Bold" size={16} />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir este agendamento?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. O agendamento será excluído
                  permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  variant="brand"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting && (
                    <Loader2Icon className="size-5 animate-spin" />
                  )}
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
