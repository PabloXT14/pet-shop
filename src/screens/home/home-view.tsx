import { Header } from "./components/header"

import type { useHomeViewModel } from "./use-home-view-model"

type HomeViewProps = ReturnType<typeof useHomeViewModel>

export const HomeView = (_props: HomeViewProps) => {
  return (
    <div className="min-h-screen bg-background-primary">
      {/* CONTENT */}
      <div className="mx-auto w-full max-w-218 px-5 py-14 md:p-20">
        <Header />
      </div>
    </div>
  )
}
