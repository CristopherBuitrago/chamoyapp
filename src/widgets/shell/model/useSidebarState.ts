import { useCallback, useEffect, useState } from 'react'

const KEY = 'app:sidebar:collapsed'

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw != null) setCollapsed(raw === '1')
  }, [])

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(KEY, next ? '1' : '0')
      return next
    })
  }, [])

  return { collapsed, toggle }
}
