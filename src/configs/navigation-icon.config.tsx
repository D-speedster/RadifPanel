import {
    PiUsersThreeDuotone, PiWarningLight,
    PiHouseLineDuotone,
    PiArrowsInDuotone,
    PiBookOpenUserDuotone,
    PiBookBookmarkDuotone,
    PiAcornDuotone, PiBagSimpleDuotone, PiUsersDuotone, PiChartBar, PiShoppingCartSimple,
    PiGlobeDuotone, PiTagDuotone, PiMonitorDuotone, PiHeartbeatDuotone, PiRobotDuotone
} from 'react-icons/pi'
import { IoSettingsOutline } from "react-icons/io5";

import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    product: <PiShoppingCartSimple />,
    state: <PiChartBar />,
    setting: <IoSettingsOutline />,
    users: <PiUsersDuotone />,
    report: <PiWarningLight />,
    seller: <PiUsersThreeDuotone />,
    home: <PiHouseLineDuotone />,
    singleMenu: <PiAcornDuotone />,
    collapseMenu: <PiArrowsInDuotone />,
    groupSingleMenu: <PiBookOpenUserDuotone />,
    groupCollapseMenu: <PiBookBookmarkDuotone />,
    groupMenu: <PiBagSimpleDuotone />,
    // آیکون‌های جدید
    website: <PiGlobeDuotone />,
    category: <PiTagDuotone />,
    monitoring: <PiMonitorDuotone />,
    health: <PiHeartbeatDuotone />,
    crawler: <PiRobotDuotone />,
}

export default navigationIcon
