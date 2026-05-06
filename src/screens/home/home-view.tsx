import { Header } from "./components/header"
import { PeriodSection } from "./components/period-section"

import type { useHomeViewModel } from "./use-home-view-model"

type HomeViewProps = ReturnType<typeof useHomeViewModel>

export const HomeView = ({ appointments }: HomeViewProps) => {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* CONTENT */}
      <div className="mx-auto w-full max-w-218 px-5 py-14 md:p-20">
        <Header />

        {/* PERIODS */}
        <div className="flex flex-col gap-3">
          {/* MORNING */}
          <PeriodSection appointments={appointments} periodType="morning" />
          {/* AFTERNOON */}
          <PeriodSection appointments={appointments} periodType="afternoon" />
          {/* EVENING */}
          <PeriodSection appointments={appointments} periodType="evening" />
        </div>
      </div>
    </div>
  )
}
