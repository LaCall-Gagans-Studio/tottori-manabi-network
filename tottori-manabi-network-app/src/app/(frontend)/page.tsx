import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config

  return (
    <div className="home">
      <div className="links">
        <a
          className="admin "
          href={payloadConfig.routes.admin}
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to admin panel
        </a>
        <a
          className="docs"
          href="https://payloadcms.com/docs"
          rel="noopener noreferrer"
          target="_blank"
        >
          Documentation
        </a>
      </div>
    </div>
  )
}
