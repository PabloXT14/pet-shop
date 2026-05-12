"use client"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

export const AppointmentForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand" type="button" className="uppercase">
          Novo agendamento
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agende um atendimento</DialogTitle>

          <DialogDescription>
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>

        <form action=""></form>
      </DialogContent>
    </Dialog>
  )
}
