"use client"

import { useState } from "react"
import { AltArrowDown, CalendarMinimalistic } from "@solar-icons/react/ssr"
import dayjs from "dayjs"
import { ptBR } from "date-fns/locale/pt-BR"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"

export const DatePicker = () => {
  const [date, setDate] = useState<Date>(new Date())

  const formattedDate = dayjs(date).format("DD[/]MM[/]YYYY")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex w-fit min-w-45 flex-row items-center justify-between gap-2 rounded-lg border border-border-primary p-3 transition-colors hover:border-border-secondary focus-visible:border-border-brand">
          <CalendarMinimalistic
            weight="Bold"
            className="size-5 text-content-brand"
          />

          <span className="text-base text-content-primary">
            {formattedDate}
          </span>

          <AltArrowDown
            weight="Linear"
            className="size-5 text-content-primary"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          locale={ptBR}
          selected={date}
          onSelect={(value) => setDate(value || new Date())}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}
