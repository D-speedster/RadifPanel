import { useEffect, useState } from 'react'
import AxiosBase from '@/services/axios/AxiosBase'

// Minimal category type based on API response
// Fields are optional; we will guard accesses and render fallbacks
interface Category {
    id?: number | string
    name?: string
    slug?: string
    created_at?: string
    updated_at?: string
}

const CategoryList = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [reload, setReload] = useState<number>(0)

    useEffect(() => {
        const controller = new AbortController()
        const fetchCategories = async () => {
            setLoading(true)
            setError(null)
            try {
                // Use AxiosBase with baseURL '/api' to leverage Vite proxy and attach Authorization via interceptor
                const response = await AxiosBase.get('/categories/all', {
                    headers: {
                        Accept: 'application/json',
                    },
                    signal: controller.signal,
                })

                const payload = response?.data
                let list: unknown[] = []
                if (payload && Array.isArray((payload as any).categories)) {
                    list = (payload as any).categories
                } else if (payload && Array.isArray((payload as any).data)) {
                    list = (payload as any).data
                } else if (Array.isArray(payload)) {
                    list = payload as unknown[]
                } else {
                    list = []
                }

                setCategories((list as Category[]) ?? [])
            } catch (err: any) {
                if ((err && (err.name === 'CanceledError' || err.code === 'ERR_CANCELED')) || (err?.message || '').includes('canceled')) {
                    return
                }
                const msg = err?.response?.data?.message || err?.message || 'Unknown error while fetching categories'
                setError(msg)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
        return () => controller.abort()
    }, [reload])

    const safe = (v: unknown) => (v === null || v === undefined || v === '' ? '-' : String(v))
    const formatDate = (v?: string) => {
        if (!v) return '-'
        const d = new Date(v)
        return isNaN(d.getTime()) ? '-' : d.toLocaleString()
    }

    if (loading) {
        return (
            <div className="p-6">
                <p>Loading...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 space-y-4">
                <div className="text-red-600">Error: {error}</div>
                <button
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => setReload((n) => n + 1)}
                >
                    Retry
                </button>
            </div>
        )
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="p-6">
                <p>No categories found</p>
            </div>
        )
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">Categories</h1>
            <div className="overflow-x-auto border rounded">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-right p-3 border-b">ID</th>
                            <th className="text-right p-3 border-b">Name</th>
                            <th className="text-right p-3 border-b">Slug</th>
                            <th className="text-right p-3 border-b">Created At</th>
                            <th className="text-right p-3 border-b">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c, idx) => (
                            <tr key={String(c?.id ?? idx)} className="odd:bg-white even:bg-gray-50">
                                <td className="p-3 border-b">{safe(c?.id)}</td>
                                <td className="p-3 border-b">{safe(c?.name)}</td>
                                <td className="p-3 border-b">{safe(c?.slug)}</td>
                                <td className="p-3 border-b">{formatDate(c?.created_at)}</td>
                                <td className="p-3 border-b">{formatDate(c?.updated_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryList