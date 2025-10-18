import WebsiteListSearch from './WebsiteListSearch'
import WebsiteTableFilter from './WebsiteTableFilter'

const WebsiteListTableTools = () => {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <WebsiteListSearch />
            <WebsiteTableFilter />
        </div>
    )
}

export default WebsiteListTableTools