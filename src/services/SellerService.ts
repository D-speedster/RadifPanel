import ApiService from './ApiService'

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
    
    // Transform the response to match the expected format
    // API returns array directly, but frontend expects {list: [], total: number}
    let sellerList: any[] = [];
    if (Array.isArray(response)) {
        sellerList = response;
        // ذخیره لیست فروشندگان در کش
        cachedSellerList = [...response];
        return {
            list: response,
            total: response.length
        } as T
    }
    
    // اگر پاسخ در قالب مورد انتظار باشد، آن را ذخیره می‌کنیم
    if (response?.list && Array.isArray(response.list)) {
        cachedSellerList = [...response.list];
    }
    
    // If response is already in expected format, return as is
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