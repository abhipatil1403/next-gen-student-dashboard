import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import DashboardLayout from '@/components/DashboardLayout'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'Track your courses, grades, and progress.',
  icons: { icon: '/favicon.ico' },
}

import { fetchProfile } from '@/lib/supabase'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profileRes = await fetchProfile()
  
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#03000a] text-zinc-100">
        <DashboardLayout initialProfile={profileRes.data}>
          {children}
        </DashboardLayout>
      </body>
    </html>
  )
}