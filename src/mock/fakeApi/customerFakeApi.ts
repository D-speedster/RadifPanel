import { customersData } from '../data/customerData'

export default function customerFakeApi(mock: any) {
    mock.onGet('/customers').reply((config: any) => {
        const { pageIndex = 0, pageSize = 10, sort, query } = config.params || {}
        
        let filteredCustomers = [...customersData]
        
        // Apply search filter
        if (query) {
            const searchTerm = query.toLowerCase()
            filteredCustomers = filteredCustomers.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(searchTerm) ||
                    customer.email.toLowerCase().includes(searchTerm) ||
                    customer.phone?.includes(searchTerm)
            )
        }
        
        // Apply sorting
        if (sort) {
            const { key, order } = sort
            filteredCustomers.sort((a: any, b: any) => {
                if (order === 'asc') {
                    return a[key] > b[key] ? 1 : -1
                }
                return a[key] < b[key] ? 1 : -1
            })
        }
        
        const total = filteredCustomers.length
        const start = pageIndex * pageSize
        const end = start + pageSize
        const paginatedCustomers = filteredCustomers.slice(start, end)
        
        const response = {
            list: paginatedCustomers,
            total,
        }
        
        return [200, response]
    })
    
    mock.onGet(/\/customers\/\d+/).reply((config: any) => {
        const id = parseInt(config.url.split('/').pop())
        const customer = customersData.find((c) => c.id === id)
        
        if (customer) {
            return [200, customer]
        }
        
        return [404, { message: 'Customer not found' }]
    })
    
    mock.onGet('/customer/log').reply((config: any) => {
        const { customerId } = config.params || {}
        
        if (customerId) {
            const customer = customersData.find((c) => c.id === parseInt(customerId))
            if (customer && customer.activity) {
                return [200, customer.activity]
            }
            return [404, { message: 'Customer activity not found' }]
        }
        
        // If no customerId is provided, return a sample of recent activities
        const recentActivities = customersData
            .flatMap(customer => 
                customer.activity.map(activity => ({
                    ...activity,
                    customerName: customer.name,
                    customerId: customer.id
                }))
            )
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10)
        
        return [200, recentActivities]
    })
    
    // Add dashboard/ecommerce endpoint
    mock.onGet('/dashboard/ecommerce').reply(() => {
        // Create mock data for dashboard
        const dashboardData = {
            salesOverview: {
                totalSales: 12500000,
                growth: 23.4,
                orders: 354,
                customers: 2814,
                recentSales: [
                    { date: '2023-05-01', amount: 420000 },
                    { date: '2023-05-02', amount: 380000 },
                    { date: '2023-05-03', amount: 450000 },
                    { date: '2023-05-04', amount: 520000 },
                    { date: '2023-05-05', amount: 480000 },
                    { date: '2023-05-06', amount: 540000 },
                    { date: '2023-05-07', amount: 620000 }
                ]
            },
            topProducts: [
                { id: 1, name: 'گوشی موبایل سامسونگ', sales: 234, revenue: 2340000 },
                { id: 2, name: 'لپ تاپ اپل', sales: 187, revenue: 5610000 },
                { id: 3, name: 'هدفون بی سیم', sales: 142, revenue: 1136000 },
                { id: 4, name: 'ساعت هوشمند', sales: 124, revenue: 1240000 },
                { id: 5, name: 'تبلت سامسونگ', sales: 98, revenue: 1470000 }
            ],
            recentOrders: [
                { id: 1, customer: 'علی محمدی', date: '2023-05-07T14:30:00', amount: 450000, status: 'completed' },
                { id: 2, customer: 'مریم حسینی', date: '2023-05-07T10:15:00', amount: 320000, status: 'processing' },
                { id: 3, customer: 'سارا احمدی', date: '2023-05-06T16:45:00', amount: 520000, status: 'completed' },
                { id: 4, customer: 'رضا کریمی', date: '2023-05-06T09:20:00', amount: 280000, status: 'cancelled' },
                { id: 5, customer: 'محمد رضایی', date: '2023-05-05T13:10:00', amount: 370000, status: 'completed' }
            ]
        }
        
        return [200, dashboardData]
    })
}