'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Flame, Trophy, Database, CheckCircle2, Star, BookOpen, Sparkles } from 'lucide-react'
import { Course, Profile } from '@/lib/supabase'

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (Icons as any)[name] ?? Icons.BookOpen
  return <Icon className={className} />
}

interface Props {
  courses: Course[]
  profile: Profile | null
  isFallback: boolean
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 150, damping: 18 } }
}

const hover = {
  whileHover: { scale: 1.015, y: -3 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 }
}

const card = 'p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md flex flex-col justify-between'

const activityColors = [
  'bg-zinc-900/30 border-zinc-800/30',
  'bg-violet-500/10 border-violet-500/15',
  'bg-violet-500/20 border-violet-500/25',
  'bg-violet-500/45 border-violet-500/50',
  'bg-violet-500 border-violet-400/80',
]

const activityPattern = [3,4,1,0,2,4,3,2,0,1,4,3,0,2,1,4,3,2,4,1,0,3,4,2,1,0,4,3]

export default function DashboardGrid({ courses, profile, isFallback }: Props) {
  const name = profile?.full_name ?? 'Aarav Sharma'
  const xp = profile?.xp ?? 1200
  const rank = profile?.rank ?? 'Scholar'
  const streak = profile?.daily_streak ?? 8
  const track = profile?.learning_track ?? 'MERN Stack & DSA'

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(170px,auto)] w-full"
    >
      {/* hero */}
      <motion.article variants={fadeUp} {...hover} className={`md:col-span-2 min-h-[200px] relative overflow-hidden ${card}`}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-800/60 border border-zinc-700/50 text-[11px] text-zinc-300 font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Learning Track: {track}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Welcome back, {name}
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg leading-relaxed">
            Steady progress this week — syllabus completion speed up 15% after finishing React Hooks.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 items-center justify-between border-t border-zinc-800/60 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/25 flex items-center justify-center">
              <Flame className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Current Streak</div>
              <div className="text-sm font-semibold text-zinc-200">{streak} consecutive days</div>
            </div>
          </div>

          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[11px] font-mono ${
            isFallback
              ? 'bg-amber-500/5 border-amber-500/15 text-amber-400'
              : 'bg-emerald-500/5 border-emerald-500/15 text-emerald-400'
          }`}>
            <Database className="w-3.5 h-3.5" />
            {isFallback ? 'Sandbox Database' : 'Supabase Connected'}
          </div>
        </div>
      </motion.article>

      {/* xp */}
      <motion.article variants={fadeUp} {...hover} className={`min-h-[200px] ${card}`}>
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/5 border border-emerald-500/15">
            {rank}
          </span>
        </div>
        <div className="space-y-1.5 mt-4">
          <h3 className="text-lg font-semibold text-zinc-100">{xp} XP Earned</h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            {rank} tier — {xp} XP accumulated.
          </p>
        </div>
      </motion.article>

      {/* courses */}
      {courses.length === 0 ? (
        <div className="p-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/5 flex flex-col items-center justify-center min-h-[190px] text-center">
          <BookOpen className="w-6 h-6 text-zinc-600 mb-2" />
          <p className="text-xs text-zinc-500 font-semibold">No courses seeded</p>
          <span className="text-[9px] text-zinc-600 mt-1 max-w-[150px] leading-relaxed">
            Populate the courses table in Supabase SQL Editor.
          </span>
        </div>
      ) : courses.map((course, idx) => (
        <motion.article key={course.id} variants={fadeUp} {...hover} className={`min-h-[190px] p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-md flex flex-col justify-between`}>
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-lg bg-zinc-800/40 border border-zinc-700/40 flex items-center justify-center">
              <DynamicIcon name={course.icon_name} className="w-5 h-5 text-violet-400" />
            </div>
            <span className="text-[9px] font-mono text-zinc-600 uppercase">
              {course.id.slice(0, 6)}
            </span>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-base font-semibold text-zinc-200">{course.title}</h3>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Progress</span>
                <span className="text-violet-400 font-mono font-medium">{course.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900/85">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ type: 'spring' as const, stiffness: 60, damping: 15, delay: 0.2 + idx * 0.08 }}
                  className="h-full bg-violet-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.article>
      ))}

      {/* calendar */}
      <motion.article variants={fadeUp} {...hover} className={`md:col-span-2 min-h-[220px] ${card}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-semibold text-zinc-200">Learning Consistency</h3>
            <p className="text-xs text-zinc-500">Completed video tasks or coding checkpoints per day.</p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900/40 px-2.5 py-1 rounded border border-zinc-800">
            24/28 active
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {activityPattern.map((val, idx) => (
            <div
              key={idx}
              title={`Level ${val}`}
              className={`aspect-square rounded border transition-all duration-200 hover:scale-105 cursor-pointer ${activityColors[val]}`}
            />
          ))}
        </div>
      </motion.article>

      {/* milestones */}
      <motion.article variants={fadeUp} {...hover} className={`min-h-[220px] ${card}`}>
        <h3 className="text-base font-semibold text-zinc-200">Completed Tracks</h3>
        <div className="space-y-4 my-auto">
          {[
            { icon: CheckCircle2, label: 'MERN Stack Basics', sub: '12 lessons completed' },
            { icon: Star, label: 'Java & DSA Foundations', sub: '8 lessons completed' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded bg-zinc-800/40 border border-zinc-700/40 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-200">{label}</div>
                <div className="text-[10px] text-zinc-500">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.article>
    </motion.div>
  )
}