import dayjs from "dayjs"
import { CloudSun2, MoonStars, SunFog } from "@solar-icons/react/ssr"

type Appointment = {
  id: string
  petName: string
  description: string
  tutorName: string
  phone: string
  scheduleAt: Date
}

type PeriodSectionProps = {
  appointments: Appointment[]
  periodType: "morning" | "afternoon" | "evening"
}

const PERIOD_ICONS = {
  morning: <SunFog weight="Bold" size={24} className="text-accent-blue" />,
  afternoon: (
    <CloudSun2 weight="Bold" size={24} className="text-accent-orange" />
  ),
  evening: <MoonStars weight="Bold" size={24} className="text-accent-yellow" />,
}

export const PeriodSection = ({
  appointments,
  periodType = "morning",
}: PeriodSectionProps) => {
  return (
    <section className="w-full rounded-[10px] bg-background-tertiary">
      <header className="flex items-center gap-3 border-border-tertiary border-b px-5 py-3">
        {PERIOD_ICONS[periodType]}

        <h2 className="flex-1 text-content-primary text-label-large">Manhã</h2>

        <p className="text-content-secondary text-label-large">9h-12h</p>
      </header>

      {/* CLIENTS */}
      <div className="flex flex-col gap-0.5 p-5">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="w-full not-last:border-border-divisor not-last:border-b"
          >
            {/* ON MOBILE */}
            <div className="flex w-full flex-col items-end gap-2 p-3 md:hidden">
              <div className="flex w-full flex-col">
                <div className="flex w-full items-center gap-3">
                  <h3 className="text-label-medium">
                    {dayjs(appointment.scheduleAt).format("HH:mm")}
                  </h3>

                  <p className="text-content-primary text-label-small">
                    {appointment.petName}
                    <span className="text-content-secondary text-paragraph-small">
                      {" "}
                      / {appointment.tutorName}
                    </span>
                  </p>
                </div>

                <p className="text-content-secondary text-paragraph-small">
                  {appointment.description}
                </p>
              </div>

              <button
                type="button"
                className="text-content-tertiary text-paragraph-small"
              >
                Remover agendamento
              </button>
            </div>

            {/* ON DESKTOP */}
            <div className="hidden h-12 w-full items-center gap-4 px-3 md:flex">
              <h3 className="text-label-medium">
                {dayjs(appointment.scheduleAt).format("HH:mm")}
              </h3>

              <p className="flex-1 text-content-primary text-label-small">
                {appointment.petName}
                <span className="text-content-secondary text-paragraph-small">
                  {" "}
                  / {appointment.tutorName}
                </span>
              </p>

              <p className="flex-1 text-content-secondary text-paragraph-small">
                {appointment.description}
              </p>

              <button
                type="button"
                className="text-content-tertiary text-paragraph-small"
              >
                Remover agendamento
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
