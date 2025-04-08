'use client'

import React, { ReactNode, useState } from 'react'

//Accordion
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
export const Accordion: React.FC<{ icon: React.ReactNode; title: string; text: ReactNode }> = ({
  icon: Icon,
  title,
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div>
      <div className="flex text-ws-primary text-2xl items-center font-semibold gap-2">
        {Icon}
        <h2>{title}</h2>
        <div className="lg:hidden" onClick={toggleExpanded}>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      <div className={`ml-3 mt-2 ${isExpanded ? 'block' : 'hidden'} lg:block`}>{text}</div>
    </div>
  )
}
