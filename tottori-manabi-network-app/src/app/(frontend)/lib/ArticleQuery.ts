export type ArticleQueryOptions = {
  tags?: number[]
}

export function buildArticleQuery({ tags = [] }: ArticleQueryOptions): string {
  const params = new URLSearchParams()

  if (tags.length > 0) {
    tags.forEach((tag, i) => {
      params.set(`where[or][${i}][tags][contains]`, tag.toString())
    })
  }

  params.set('depth', '1')
  return params.toString()
}
