import type { JSX } from "react"
import { CloudSun2, MoonStars, SunFog } from "@solar-icons/react/ssr"

import type {
  AppointmentDayPeriod,
  AppointmentPeriodGroup,
} from "@/shared/types/appointment"

import { AppointmentCard } from "../appointment-card"

type PeriodSectionProps = {
  groupedAppointment: AppointmentPeriodGroup
}

const PERIOD_ICONS: Record<AppointmentDayPeriod, JSX.Element> = {
  morning: <SunFog weight="Bold" size={24} className="text-accent-blue" />,
  afternoon: (
    <CloudSun2 weight="Bold" size={24} className="text-accent-orange" />
  ),
  evening: <MoonStars weight="Bold" size={24} className="text-accent-yellow" />,
}

export const PeriodSection = ({ groupedAppointment }: PeriodSectionProps) => {
  return (
    <section className="w-full rounded-[10px] bg-background-tertiary">
      <header className="flex items-center gap-3 border-border-tertiary border-b px-5 py-3">
        {PERIOD_ICONS[groupedAppointment.type]}

        <h2 className="flex-1 text-content-primary text-label-large">
          {groupedAppointment.title}
        </h2>

        <p className="text-content-secondary text-label-large">
          {groupedAppointment.timeRange}
        </p>
      </header>

      {/* CLIENTS */}
      <div className="flex flex-col gap-0.5 p-5">
        {groupedAppointment.appointments.length === 0 && (
          <p className="w-full p-3 text-center text-content-secondary text-paragraph-small">
            Sem agendamentos para este período
          </p>
        )}

        {groupedAppointment.appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </section>
  )
}
