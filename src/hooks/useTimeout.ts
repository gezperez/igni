import { useEffect } from 'react'

const useTimeout = (callback: Function, ms: number) => {
  useEffect(() => {
    const timer = setTimeout(callback, ms)

    return () => clearTimeout(timer)
  }, [callback, ms])
}

export default useTimeout
