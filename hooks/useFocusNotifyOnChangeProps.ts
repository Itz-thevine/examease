import React from 'react'
import { NotifyOnChangeProps } from '@tanstack/query-core'
import { useFocusEffect } from '@react-navigation/native'

export function useFocusNotifyOnChangeProps(
  notifyOnChangeProps?: NotifyOnChangeProps,
): NotifyOnChangeProps {
  const focusedRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      focusedRef.current = true

      return () => {
        focusedRef.current = false
      }
    }, []),
  )

  if (!focusedRef.current) {
    return []
  }

  if (typeof notifyOnChangeProps === 'function') {
    return notifyOnChangeProps()
  }

  return notifyOnChangeProps || []
}
