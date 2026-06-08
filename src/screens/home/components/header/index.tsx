import { DatePicker } from "@/shared/components/date-picker"

export const Header = () => {
  return (
    <header className="mb-8 flex w-full flex-col gap-3 md:flex-row md:items-center">
      {/* TITLE */}
      <div className="flex flex-1 flex-col gap-1">
        <h1 className="text-content-primary text-title">Sua agenda</h1>
        <p className="text-content-secondary text-paragraph-medium">
          Aqui você pode ver todos os clientes e serviços agendados para hoje.
        </p>
      </div>

      {/* CALENDAR */}
      {/* <div className="h-12 w-full max-w-[172] rounded-lg bg-background-tertiary"></div> */}
      <DatePicker />
    </header>
  )
}
