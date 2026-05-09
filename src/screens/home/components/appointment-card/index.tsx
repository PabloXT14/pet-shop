import dayjs from "dayjs"

import type { Appointment } from "@/shared/types/appointment"

type AppointmentCardProps = {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
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
        <button
          type="button"
          className="self-end text-content-tertiary text-paragraph-small md:self-auto"
        >
          Remover agendamento
        </button>
      </div>
    </div>
  )
}
