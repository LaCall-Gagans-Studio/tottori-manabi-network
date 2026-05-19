/**
 * Payload REST API のベース URL を返す。
 *
 * - ブラウザ: 常に同一オリジン (相対パス) → ローカル dev でも CORS にならない
 * - サーバー (RSC/SSR): NEXT_PUBLIC_API_URL を使用。未設定時は localhost
 */
export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return ''
  }

  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT ?? '3000'
    return `http://localhost:${port}`
  }

  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '')
  if (fromEnv) return fromEnv

  return 'https://www.tuna-kan.org'
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalizedPath}` : normalizedPath
}
