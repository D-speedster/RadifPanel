import ApiService from './ApiService'
import SellerMockService from './SellerMockService'
import type { CommonResponse } from '@/@types/common'

// کش کردن لیست فروشندگان برای استفاده در توابع دیگر
let cachedSellerList: any[] = [];

export async function apiGetSellerList<T, U extends Record<string, unknown>>(
    params: U,
) {
    const response = await ApiService.fetchDataWithAxios<any>({
        url: '/sellers/all',
        method: 'get',
        params,
    })
    
    // Handle real API response format: {message, sellers}
    if (response?.sellers && Array.isArray(response.sellers)) {
        cachedSellerList = [...response.sellers];
        return {
            list: response.sellers,
            total: response.sellers.length
        } as T
    }
    
    // Fallback for other formats
    return response as T
}

export async function apiGetSeller<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    // ابتدا تلاش می‌کنیم فروشنده را از کش پیدا کنیم
    const sellerId = id as string;
    const cachedSeller = cachedSellerList.find(seller => seller.id.toString() === sellerId);
    
    // اگر فروشنده در کش موجود باشد، آن را برمی‌گردانیم
    if (cachedSeller) {
        return cachedSeller as T;
    }
    
    // اگر فروشنده در کش نباشد، ابتدا لیست فروشندگان را دریافت می‌کنیم
    if (cachedSellerList.length === 0) {
        try {
            const response = await apiGetSellerList<any, any>({});
            // بعد از دریافت لیست، دوباره تلاش می‌کنیم فروشنده را پیدا کنیم
            const seller = cachedSellerList.find(seller => seller.id.toString() === sellerId);
            if (seller) {
                return seller as T;
            }
        } catch (error) {
            console.error('Error fetching seller list:', error);
        }
    }
    
    // اگر هنوز فروشنده را پیدا نکردیم، از API درخواست می‌کنیم
    return ApiService.fetchDataWithAxios<T>({
        url: `/sellers/${id}`,
        method: 'get',
        params,
    })
}

export const apiUpdateSeller = async (id: string, sellerData: any) => {
    // ارسال درخواست ویرایش به API اصلی طبق نیاز کاربر
    return ApiService.fetchDataWithAxios<unknown>({
        url: `https://api.radif.org/api/sellers/${id}`,
        method: 'put',
        headers: { Accept: 'application/json' },
        data: sellerData,
    })
}

export const apiDeleteSeller = async (id: string) => {
    // ارسال درخواست حذف به API اصلی طبق مشخصات کاربر
    return ApiService.fetchDataWithAxios<unknown>({
        url: `https://api.radif.org/api/sellers/${id}`,
        method: 'delete',
        headers: { Accept: 'application/json' },
    })
}

export async function apiCreateSeller<T, U extends Record<string, unknown>>(
    data: U,
) {
    // استفاده از URL مطلق برای اطمینان از ارسال درخواست به سرویس اصلی
    return ApiService.fetchDataWithAxios<T>({
        url: 'https://api.radif.org/api/sellers/create',
        method: 'post',
        data,
    })
}