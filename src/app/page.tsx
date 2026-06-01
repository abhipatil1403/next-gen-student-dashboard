import { fetchCourses, fetchProfile } from '@/lib/supabase'
import DashboardGrid from '@/components/DashboardGrid'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [coursesRes, profileRes] = await Promise.all([fetchCourses(), fetchProfile()])

  return (
    <DashboardGrid
      courses={coursesRes.data ?? []}
      profile={profileRes.data}
      isFallback={coursesRes.isFallback}
    />
  )
}