import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { redirectTo?: string } = {}
) {
  return function WithAuthComponent(props: P) {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const { redirectTo = '/auth/login' } = options

    useEffect(() => {
      if (!isLoading && !user) {
        router.push(redirectTo)
      }
    }, [user, isLoading, router, redirectTo])

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      )
    }

    if (!user) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
