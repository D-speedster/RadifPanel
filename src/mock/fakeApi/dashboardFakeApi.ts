import { ecommerceDashboardData } from '../data/dashboardData'

export default function dashboardFakeApi(mock: any) {
    mock.onGet('/dashboard/ecommerce').reply(() => {
        return [200, ecommerceDashboardData]
    })
}