'use client'

import { CiShare2 } from 'react-icons/ci'
import { siteConfig } from '@/app/(frontend)/siteConfig'

type ShareButtonProps = {
  title: string
  id: string
}

export const ShareButton = ({ title, id }: ShareButtonProps) => {
  const handleShare = async () => {
    const shareUrl = `${siteConfig.url}/articles/${id}`

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl })
      } catch (err) {
        console.error('Share failed:', err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl)
        alert('リンクをコピーしました！')
      } catch (err) {
        console.error('コピー失敗:', err)
      }
    }
  }

  return <CiShare2 className="text-2xl ml-1 cursor-pointer" onClick={handleShare} />
}
