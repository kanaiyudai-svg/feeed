import { changePassword } from '../../actions'
import { currentAccount, requireUser } from '@/lib/supabase'
import { Shell } from '../../ui/Shell'

const MESSAGES: Record<string, string> = {
  short: 'パスワードは12文字以上にしてください。',
  mismatch: '2つの入力が合いません。',
  failed: '変えられませんでした。いったんログインし直してから、もう一度試してください。',
}

export default async function Password({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; done?: string }>
}) {
  const { sb, store } = await requireUser('/password')
  const current = await currentAccount(sb, store)
  const { error, done } = await searchParams
  return (
    <Shell title="パスワード" back="/accounts" viewer={current} accountHref="/accounts" base="">
      <form action={changePassword} className="acct-new">
        <h2>ログインのパスワードを変える</h2>
        {done && <p role="status">変えました。次のログインから、新しいパスワードを使います。</p>}
        {error && (
          <p role="alert" className="login-err">
            {MESSAGES[error] ?? MESSAGES.failed}
          </p>
        )}
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          placeholder="新しいパスワード、12文字以上"
        />
        <input
          name="confirm"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          placeholder="もう一度入れる"
        />
        <button className="btn">変える</button>
      </form>
    </Shell>
  )
}
