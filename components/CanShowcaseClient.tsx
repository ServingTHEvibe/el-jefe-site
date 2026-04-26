'use client'

import dynamic from 'next/dynamic'

const CanShowcase = dynamic(() => import('@/components/CanShowcase'), { ssr: false })

export default function CanShowcaseClient() {
  return <CanShowcase />
}
