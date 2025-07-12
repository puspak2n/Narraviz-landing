import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to get user role
export const getUserRole = async (userId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.user_metadata?.role) {
      return user.user_metadata.role
    }
    
    // Check if user has Pro subscription
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('plan, status')
      .eq('user_id', userId)
      .single()
    
    if (data?.plan === 'pro' && data?.status === 'active') {
      return 'Pro'
    } else if (data?.plan === 'enterprise') {
      return 'Enterprise'
    }
    
    return 'Viewer'
  } catch (error) {
    return 'Viewer'
  }
}