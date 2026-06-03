"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AltArrowDown,
  CalendarMinimalistic,
  ClockCircle,
  Paw,
  Phone,
  User,
} from "@solar-icons/react/ssr"
import { Loader2Icon } from "lucide-react"
import dayjs from "dayjs"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { Textarea } from "@/shared/components/ui/textarea"
import { Input } from "@/shared/components/ui/input"
import { Calendar } from "@/shared/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/shared/components/ui/select"

import { createAppointmentAction } from "@/shared/actions/create-appointment-action"

import { type AppointmentFormData, appointmentFormSchema } from "./schema"

const generateTimeOptions = () => {
  const times = []

  for (let hour = 9; hour <= 21; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`)

    if (hour === 21) break

    times.push(`${hour.toString().padStart(2, "0")}:30`)
  }

  return times
}

const TIME_OPTIONS = generateTimeOptions()

export const AppointmentForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: "",
      petName: "",
      phone: "",
      description: "",
      date: undefined,
      time: "",
    },
  })

  const onSubmit = async (data: AppointmentFormData) => {
    const [hours, minutes] = data.time.split(":").map(Number)

    const scheduleAt = dayjs(data.date).hour(hours).minute(minutes).toDate()

    const result = await createAppointmentAction({
      tutorName: data.tutorName,
      petName: data.petName,
      phone: data.phone,
      description: data.description,
      scheduleAt,
    })

    if (result?.error) {
      return toast.error(result.error)
    }

    toast.success("Agendamento realizado com sucesso!")

    reset()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
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
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite o nome do tutor"
                    className="pl-10"
                    {...field}
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
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Digite o nome do pet"
                    className="pl-10"
                    {...field}
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
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="(00) 00000-0000"
                    mask="(00) 00000-0000"
                    className="pl-10"
                    {...field}
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

          {/* DATE AND TIME */}
          <div className="flex w-full flex-col gap-4 md:flex-row">
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Data</FieldLabel>

                  <Popover>
                    <PopoverTrigger>
                      <div className="relative">
                        <CalendarMinimalistic
                          weight="Bold"
                          className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-5 text-content-brand"
                        />

                        <Input
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="dd/mm/aaaa"
                          className="cursor-pointer pl-10"
                          value={
                            field.value
                              ? dayjs(field.value).format("DD/MM/YYYY")
                              : ""
                          }
                          readOnly
                        />

                        <AltArrowDown
                          weight="Linear"
                          className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 size-5 text-content-primary"
                        />
                      </div>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < dayjs().startOf("day").toDate()
                        }
                        captionLayout="dropdown"
                        // formatters={{
                        //   formatMonthDropdown: (date) => {
                        //     return date
                        //       .toLocaleString("pt-BR", {
                        //         month: "short",
                        //         year: "numeric",
                        //       })
                        //       .replace(".", "")
                        //       .replace(/^\w/, (c) => c.toUpperCase())
                        //       .slice(0, 4)
                        //   },
                        // }}
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="time"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Hora</FieldLabel>

                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2">
                        <ClockCircle
                          weight="Bold"
                          className="pointer-events-none size-5 text-content-brand"
                        />

                        {field.value ? (
                          <span className="text-base text-content-primary">
                            {field.value}
                          </span>
                        ) : (
                          <span className="text-base text-content-secondary">
                            hh:mm
                          </span>
                        )}
                      </div>
                    </SelectTrigger>

                    <SelectContent className="w-auto p-0" position="popper">
                      <SelectGroup>
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </form>

        <Button
          form="appointment-form"
          type="submit"
          variant="brand"
          className="ml-auto w-fit uppercase"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="size-5 animate-spin" />}
          Agendar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
