import { HomeView } from "@/screens/home/home-view"
import { useHomeViewModel } from "@/screens/home/use-home-view-model"

export default async function Home() {
  const props = useHomeViewModel()

  return <HomeView {...props} />
}
