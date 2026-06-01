import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

export const isSupabaseConfigured =
  !!url && url !== 'your-supabase-project-url' &&
  !!key && key !== 'your-supabase-anon-key'

export const supabase = isSupabaseConfigured ? createClient(url, key) : null

export interface Course {
  id: string
  title: string
  progress: number
  icon_name: string
  created_at: string
}

export interface Profile {
  id?: string
  full_name: string
  rank: string
  learning_track: string
  daily_streak?: number
  xp?: number
}

const notConfigured = { data: null, error: new Error('Supabase not configured') }

export async function fetchCourses() {
  if (!supabase) return { ...notConfigured, data: [] as Course[], isFallback: false }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) throw error
    return { data: data as Course[], error: null, isFallback: false }
  } catch (err) {
    console.warn('courses query failed:', err)
    return { data: [] as Course[], error: err as Error, isFallback: false }
  }
}

export async function fetchProfile() {
  if (!supabase) return notConfigured

  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle()
    if (error) throw error
    return { data: data as Profile, error: null }
  } catch (err) {
    console.warn('profiles query failed:', err)
    return { data: null, error: err as Error }
  }
}

export async function updateProfile(profile: Partial<Profile>) {
  if (!supabase) return notConfigured

  try {
    const { data: current } = await supabase.from('profiles').select('id').limit(1).maybeSingle()

    const query = current
      ? supabase.from('profiles').update(profile).eq('id', current.id)
      : supabase.from('profiles').insert(profile)

    const { data, error } = await query.select().single()
    if (error) throw error
    return { data: data as Profile, error: null }
  } catch (err) {
    console.warn('profiles update failed:', err)
    return { data: null, error: err as Error }
  }
}