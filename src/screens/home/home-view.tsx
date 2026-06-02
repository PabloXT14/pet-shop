import { Header } from "./components/header"
import { PeriodSection } from "./components/period-section"
import { AppointmentForm } from "./components/appointment-form"

import { useHomeViewModel } from "./use-home-view-model"

export const HomeView = async () => {
  const { groupedAppointments } = await useHomeViewModel()

  return (
    <div className="min-h-screen bg-background-primary">
      {/* CONTENT */}
      <div className="mx-auto w-full max-w-218 px-5 py-14 md:p-20">
        <Header />

        {/* PERIODS */}
        <div className="flex flex-col gap-3">
          {groupedAppointments?.map((groupedAppointment) => (
            <PeriodSection
              key={groupedAppointment.type}
              groupedAppointment={groupedAppointment}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <div className="flex items-center justify-center bg-background-tertiary p-5 md:fixed md:right-8 md:bottom-8 md:bg-transparent md:p-0">
        <AppointmentForm />
      </div>
    </div>
  )
}
