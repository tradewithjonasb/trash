import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
)

/**
 * Initialize database schema (run once)
 */
export async function initDatabase() {
  // Check if tables exist, create if not
  const { data: tables, error } = await supabase
    .from('pg_tables')
    .select('tablename')
    .eq('schemaname', 'public')

  if (error) {
    console.error('Error checking database schema:', error)
    return
  }

  const requiredTables = ['users', 'vaults', 'transactions', 'user_settings']
  const missingTables = requiredTables.filter(
    table => !tables?.some(t => t.tablename === table)
  )

  if (missingTables.length > 0) {
    console.log('Creating missing tables:', missingTables)
    // In a real app, you would run schema migrations here
    // For now, we'll just log the missing tables
  }
}

// Initialize database on first import
initDatabase().catch(console.error)