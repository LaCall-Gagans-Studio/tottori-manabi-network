// ボタン大
import { ReactElement } from 'react'
import { FiSearch } from 'react-icons/fi'

export const Button_big = ({
  text,
  url,
  props,
}: {
  text: ReactElement
  url: string
  props?: string
}) => {
  return (
    // ye
    <div className={`text-xl lg:text-2xl ${props}`}>
      <a
        href={url}
        className="inline-flex items-center px-6 py-3 text-white font-bold gap-3 bg-ws-primary border-4 border-white rounded-full shadow hover:opacity-80"
      >
        <FiSearch className="text-4xl" />
        {text}
      </a>
    </div>
  )
}
