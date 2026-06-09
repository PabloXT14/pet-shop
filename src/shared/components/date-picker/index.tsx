"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { AltArrowDown, CalendarMinimalistic } from "@solar-icons/react/ssr"
import dayjs from "dayjs"
import { ptBR } from "date-fns/locale/pt-BR"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"

export const DatePicker = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const dateParam = searchParams.get("date")

  const updateUrlWithDate = useCallback(
    (selectedDate: Date) => {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD")
      const newSearchParams = new URLSearchParams(searchParams.toString())

      newSearchParams.set("date", formattedDate)

      router.push(`${pathname}?${newSearchParams.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const getInitialDate = useCallback(() => {
    if (!dateParam) return new Date()

    const isValidDate = dayjs(dateParam, "YYYY-MM-DD", true).isValid()

    if (!isValidDate) return new Date()

    const parsedDate = dayjs(dateParam, "YYYY-MM-DD").toDate()

    return parsedDate
  }, [dateParam])

  const [date, setDate] = useState<Date>(getInitialDate())
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate)
    updateUrlWithDate(selectedDate)
  }

  useEffect(() => {
    if (!dateParam) {
      updateUrlWithDate(date)
    }
  }, [dateParam, date, updateUrlWithDate])

  const formattedDate = dayjs(date).format("DD[/]MM[/]YYYY")

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(open) => setIsPopoverOpen(open)}
    >
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
          onSelect={(value) => handleDateChange(value || new Date())}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}
