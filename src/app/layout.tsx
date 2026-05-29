import type { Metadata } from "next"
import { Inter, Inter_Tight } from "next/font/google"
import { Toaster } from "sonner"

import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import customParseFormat from "dayjs/plugin/customParseFormat"

dayjs.extend(customParseFormat) // Permite que o dayjs reconheça formatos personalizados de data (ex: "DD/MM/YYYY HH:mm")
dayjs.locale("pt-br") // Define o idioma para português do Brasil

import "@/styles/globals.css"

import { cn } from "@/shared/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "700"],
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "Mundo Pet",
  description: "Site de agendamento de consultas veterinárias de um pet shop.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(inter.variable, interTight.variable, "antialiased")}
    >
      <body className="flex min-h-full flex-col">
        {children}

        <Toaster position="top-right" theme="dark" richColors />
      </body>
    </html>
  )
}
