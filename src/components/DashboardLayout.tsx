'use client'

import { useState, useEffect } from 'react'
import {
  LayoutDashboard, BookOpen, BarChart3, Trophy, Settings,
  ChevronLeft, ChevronRight, GraduationCap, Award, Zap,
  CheckCircle2, Calendar, Clock, BookOpenCheck, Database
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchProfile, updateProfile, Profile } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { id: 'overview',      name: 'Overview',      icon: LayoutDashboard },
  { id: 'courses',       name: 'My Courses',    icon: BookOpen },
  { id: 'analytics',     name: 'Analytics',     icon: BarChart3 },
  { id: 'achievements',  name: 'Achievements',  icon: Trophy },
  { id: 'settings',      name: 'Settings',      icon: Settings },
]

const COURSES = [
  { title: 'Full-Stack Development (MERN Stack)', desc: 'Backend APIs with Node/Express, React state management, and MongoDB migrations.', code: 'CS-101', level: 'Intermediate', completion: '78%' },
  { title: 'Data Structures & Algorithms',        desc: 'Algorithmic complexity, tree traversals, dynamic programming, and graph traversals.', code: 'CS-205', level: 'Advanced',      completion: '45%' },
  { title: 'Database Management Systems',         desc: 'Relational queries, indexing, normalization, and ACID transactions.',               code: 'CS-302', level: 'Beginner',      completion: '92%' },
  { title: 'System Design Essentials',            desc: 'Load balancing, caching, database scaling, and microservice architecture.',         code: 'CS-401', level: 'Advanced',      completion: '60%' },
]

const ACTIVITY = [
  { day: 'Mon', mins: 45 }, { day: 'Tue', mins: 80 }, { day: 'Wed', mins: 35 },
  { day: 'Thu', mins: 90 }, { day: 'Fri', mins: 60 }, { day: 'Sat', mins: 120 }, { day: 'Sun', mins: 40 },
]

const BADGES = [
  { title: 'Velocity Demon',    desc: 'Solved 10 problems in 1 hour',           icon: Zap },
  { title: 'RSC Connoisseur',   desc: 'Implemented full server data fetching',   icon: CheckCircle2 },
  { title: 'MERN Mastery',      desc: 'Finished advanced Node API syllabus',     icon: Award },
]

const tabAnim = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -15 },
  transition: { duration: 0.2 },
}

export default function DashboardLayout({ 
  children,
  initialProfile
}: { 
  children: React.ReactNode
  initialProfile: Profile | null 
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const [name, setName]   = useState(initialProfile?.full_name || 'Aarav Sharma')
  const [track, setTrack] = useState(initialProfile?.learning_track || 'MERN Stack & DSA')
  const [rank, setRank]   = useState(initialProfile?.rank || 'Scholar')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      setCollapsed(w <= 1024)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    fetchProfile().then(res => {
      if (!res.data) return
      setName(res.data.full_name)
      setTrack(res.data.learning_track)
      setRank(res.data.rank)
    })
  }, [])

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await updateProfile({ full_name: name, learning_track: track })
    if (error || !data) return
    setName(data.full_name)
    setTrack(data.learning_track)
    setSaved(true)
    router.refresh()
    setTimeout(() => setSaved(false), 3000)
  }

  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-[#03000a] text-zinc-100 font-sans grid-bg overflow-hidden">

      {/* sidebar */}
      {!isMobile && (
        <aside className={`h-screen z-20 flex flex-col border-r border-[#1a162b] bg-[#090616]/80 backdrop-blur-xl transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
          <div className="h-20 flex items-center px-6 justify-between border-b border-[#1a162b]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              {!collapsed && (
                <span className="font-bold text-lg bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                  Student Dashboard
                </span>
              )}
            </div>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-1.5">
            {NAV_ITEMS.map(({ id, name: label, icon: Icon }) => {
              const active = activeTab === id
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors outline-none group cursor-pointer ${active ? 'text-violet-400' : 'text-zinc-400 hover:text-zinc-200'}`}
                >
                  {active && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 flex-shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-violet-400' : 'text-zinc-400'}`} />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="relative z-10 font-semibold tracking-wide"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-[#1a162b]">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center p-2.5 rounded-lg bg-zinc-900/40 hover:bg-zinc-900 border border-[#1a162b] text-zinc-400 hover:text-zinc-200 cursor-pointer"
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </aside>
      )}

      {/* main */}
      <main className="flex-1 h-screen flex flex-col overflow-y-auto pb-24 md:pb-0">
        <header className="h-20 border-b border-[#1a162b] bg-[#03000a]/50 backdrop-blur-md flex items-center justify-between px-6 md:px-10 flex-shrink-0">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
            {NAV_ITEMS.find(n => n.id === activeTab)?.name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold">{name}</span>
              <span className="text-xs text-zinc-500 font-mono">Rank: {rank}</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-violet-500/30 p-[2px] bg-gradient-to-tr from-violet-600 to-indigo-600">
              <div className="w-full h-full rounded-full bg-[#090616] flex items-center justify-center text-violet-400 font-bold text-sm">
                {initials}
              </div>
            </div>
          </div>
        </header>

        <section className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
          <AnimatePresence mode="wait">

            {activeTab === 'overview' && (
              <motion.div key="overview" {...tabAnim}>{children}</motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div key="courses" {...tabAnim} className="space-y-6">
                <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/10 backdrop-blur-md flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">Course Progression</h2>
                    <p className="text-sm text-zinc-400 mt-1">All enrolled study modules.</p>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-center gap-3">
                    <BookOpenCheck className="w-5 h-5 text-violet-400" />
                    <div>
                      <div className="text-[10px] text-zinc-500 font-bold">ACTIVE</div>
                      <div className="text-sm font-semibold">4 Courses</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {COURSES.map(c => (
                    <div key={c.code} className="p-6 rounded-xl border border-zinc-800/80 bg-zinc-900/25 flex flex-col justify-between hover:border-violet-500/30 transition-colors duration-300">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[11px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/15">{c.code}</span>
                          <span className="text-xs text-zinc-500">{c.level}</span>
                        </div>
                        <h3 className="text-base font-semibold text-zinc-100">{c.title}</h3>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{c.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-zinc-900">
                        <div className="flex justify-between text-xs font-semibold mb-2">
                          <span className="text-zinc-500">Completion</span>
                          <span className="text-violet-400">{c.completion}</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                          <div className="h-full bg-violet-500 rounded-full" style={{ width: c.completion }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div key="analytics" {...tabAnim} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Weekly Study Volume', value: '500 mins', icon: Clock },
                    { label: 'Daily Average',        value: '71 mins',  icon: Calendar },
                    { label: 'Score Ratio',          value: '94.8%',    icon: Trophy },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-zinc-900/25 border border-zinc-800/80 p-6 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-violet-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</span>
                      </div>
                      <div className="text-2xl font-bold">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/20">
                  <h3 className="text-base font-semibold text-zinc-100 mb-6">Activity Timeline (mins)</h3>
                  <div className="h-64 w-full flex items-end justify-between border-b border-zinc-800/80 px-4">
                    {ACTIVITY.map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center group h-full justify-end">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-violet-400 mb-2 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded">
                          {d.mins}m
                        </span>
                        <div
                          className="w-10 sm:w-14 bg-violet-500/20 border-t-2 border-violet-500 hover:bg-violet-500/35 transition-colors duration-300 rounded-t-md"
                          style={{ height: `${(d.mins / 120) * 100}%` }}
                        />
                        <span className="text-[11px] text-zinc-500 mt-3 font-mono">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'achievements' && (
              <motion.div key="achievements" {...tabAnim}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BADGES.map(({ title, desc, icon: Icon }) => (
                    <div key={title} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/25 flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-200 text-sm">{title}</h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div key="settings" {...tabAnim} className="max-w-2xl">
                <form onSubmit={saveSettings} className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/20 space-y-6">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-100">Profile</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">Edit details displayed on the dashboard.</p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/15">
                      Tier: {rank}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Full Name',      value: name,  setter: setName },
                      { label: 'Learning Track', value: track, setter: setTrack },
                    ].map(({ label, value, setter }) => (
                      <div key={label} className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{label}</label>
                        <input
                          type="text"
                          value={value}
                          onChange={e => setter(e.target.value)}
                          required
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-violet-500 focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-zinc-900">
                    <button
                      type="submit"
                      className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                    {saved && (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Saved!
                      </span>
                    )}
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </section>
      </main>

      {/* mobile nav */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-30 h-20 bg-[#090616]/95 border-t border-[#1a162b] backdrop-blur-lg flex items-center justify-around px-4">
          {NAV_ITEMS.map(({ id, name: label, icon: Icon }) => {
            const active = activeTab === id
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="relative flex flex-col items-center justify-center py-2 px-3 text-zinc-400 hover:text-zinc-200 cursor-pointer"
              >
                {active && (
                  <motion.div
                    layoutId="active-mobile-nav"
                    className="absolute inset-0 rounded-xl bg-violet-600/10 border border-violet-500/20 -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <Icon className={`w-5 h-5 ${active ? 'text-violet-400' : 'text-zinc-500'}`} />
                <span className={`text-[10px] mt-1 font-semibold ${active ? 'text-violet-400' : 'text-zinc-500'}`}>
                  {label}
                </span>
              </button>
            )
          })}
        </nav>
      )}
    </div>
  )
}