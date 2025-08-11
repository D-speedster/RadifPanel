// Using mock service since /api/websites endpoint doesn't exist in the real API
export {
    apiGetWebsitesList,
    apiGetWebsite,
    apiUpdateWebsite,
    apiDeleteWebsite,
    apiCrawlWebsite
} from './WebsiteMockService'