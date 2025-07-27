import { mock } from './MockAdapter'
import './fakeApi/authFakeApi'
import './fakeApi/commonFakeApi'
import './fakeApi/productFakeApi'
import sellerFakeApi from './fakeApi/sellerFakeApi'
import customerFakeApi from './fakeApi/customerFakeApi'
import dashboardFakeApi from './fakeApi/dashboardFakeApi'

sellerFakeApi(mock)
customerFakeApi(mock)
dashboardFakeApi(mock)

mock.onAny().passThrough()
