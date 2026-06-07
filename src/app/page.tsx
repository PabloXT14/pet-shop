import { HomeView } from "@/screens/home/home-view"

type RouteParams = {
  searchParams: Promise<{
    date?: string
  }>
}

export default async function Home({ searchParams }: RouteParams) {
  const { date } = await searchParams

  return <HomeView date={date} />
}
