"use client"

import { useForm, Controller } from "react-hook-form"
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
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { Paw, Phone, User } from "@solar-icons/react/ssr"
import { Textarea } from "@/shared/components/ui/textarea"

export const AppointmentForm = () => {
  const { handleSubmit, control, reset } = useForm({
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
    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand" type="button" className="uppercase">
          Novo agendamento
        </Button>
      </DialogTrigger>

      <DialogContent
        variant="appointment"
        className="scrollbar-none overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle size="modal">Agende um atendimento</DialogTitle>

          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="appointment-form"
          className="flex w-full flex-col gap-4"
        >
          <Controller
            control={control}
            name="tutorName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome do tutor</FieldLabel>

                <div className="relative">
                  <User
                    weight="Bold"
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-5 text-content-brand"
                  />

                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite o nome do tutor"
                    className="pl-10"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="petName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nome do pet</FieldLabel>

                <div className="relative">
                  <Paw
                    weight="Bold"
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-5 text-content-brand"
                  />

                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite o nome do pet"
                    className="pl-10"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Telefone</FieldLabel>

                <div className="relative">
                  <Phone
                    weight="Bold"
                    className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-5 text-content-brand"
                  />

                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="(00) 00000-0000"
                    className="pl-10"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Descrição do serviço
                </FieldLabel>

                <Textarea
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Descreva o serviço a ser realizado"
                  className="resize-none overflow-y-auto"
                  {...field}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
