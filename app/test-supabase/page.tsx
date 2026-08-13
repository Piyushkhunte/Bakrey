import { createClient } from '../../lib/supabase/server'
export default async function TestSupabase() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('test_products')
    .select('*')
    .order('id')

  if (error) {
    return (
      <main>
        <h1>Supabase Error</h1>
        <pre>{error.message}</pre>
      </main>
    )
  }

  return (
    <main>
      <h1>Supabase Connection Successful</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}