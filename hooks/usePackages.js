'use client'
import { useState, useEffect, useCallback } from 'react'
import { ALL_PACKAGES } from '@/lib/packages-data'

export function usePackages() {
  const [packages, setPackages] = useState([])
  const [loaded, setLoaded] = useState(false)

  const fetchPackages = useCallback(async () => {
    // Instead of fetching from API, use static data
    setPackages(ALL_PACKAGES)
    setLoaded(true)
  }, [])

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  const add = async (pkg) => {
    setPackages(prev => [...prev, { ...pkg, id: Date.now().toString() }])
  }

  const update = async (id, data) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  const remove = async (id) => {
    setPackages(prev => prev.filter(p => p.id !== id))
  }

  const reset = async () => {
    setPackages(ALL_PACKAGES)
  }

  return { packages, add, update, remove, reset, loaded, refresh: fetchPackages }
}
