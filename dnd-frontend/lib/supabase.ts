import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../shared/types'

export const supabase = createClientComponentClient<Database>()
