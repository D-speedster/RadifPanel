import { useState } from 'react'
import { Card } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'
import { HiChevronRight, HiChevronDown, HiPencil, HiTrash, HiPlus, HiPhotograph } from 'react-icons/hi'

interface Category {
    id: string | number
    name: string
    slug: string
    description?: string
    image?: string
    parent_id?: string | number | null
    children?: Category[]
    productCount?: number
    isExpanded?: boolean
    level?: number
}

interface CategoryTreeViewProps {
    categories: Category[]
    onEdit: (category: Category) => void
    onDelete: (category: Category) => void
    onAddChild?: (parentCategory: Category) => void
}

interface TreeNodeProps {
    category: Category
    level: number
    onEdit: (category: Category) => void
    onDelete: (category: Category) => void
    onAddChild?: (parentCategory: Category) => void
    onToggle: (categoryId: string | number) => void
    isExpanded: boolean
    expandedNodes: Set<string | number>
}

const TreeNode = ({ 
    category, 
    level, 
    onEdit, 
    onDelete, 
    onAddChild, 
    onToggle, 
    isExpanded,
    expandedNodes
}: TreeNodeProps) => {
    const hasChildren = category.children && category.children.length > 0
    const indentWidth = level * 24 // 24px per level

    return (
        <div className="select-none">
            {/* Node Row */}
            <div 
                className="flex items-center py-3 px-4 hover:bg-gray-50 transition-colors group border-b border-gray-100"
                style={{ paddingRight: `${16 + indentWidth}px` }}
            >
                {/* Expand/Collapse Button */}
                <div className="flex items-center justify-center w-6 h-6 ml-2">
                    {hasChildren ? (
                        <button
                            onClick={() => onToggle(category.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                            {isExpanded ? (
                                <HiChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <HiChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                    ) : (
                        <div className="w-4 h-4" />
                    )}
                </div>

                {/* Category Icon/Image */}
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg ml-3">
                    {category.image ? (
                        <Avatar
                            size={32}
                            src={category.image}
                            alt={category.name}
                            className="rounded-lg"
                        />
                    ) : (
                        <span className="text-gray-500 text-sm font-semibold">
                            {category.name.charAt(0)}
                        </span>
                    )}
                </div>

                {/* Category Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {category.name}
                        </h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded font-mono">
                            {category.slug}
                        </span>
                    </div>
                    {category.description && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                            {category.description}
                        </p>
                    )}
                </div>

                {/* Product Count */}
                <div className="flex items-center gap-4 ml-4">
                    <span className="text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded">
                        {category.productCount || 0} محصول
                    </span>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onAddChild && (
                            <button
                                onClick={() => onAddChild(category)}
                                className="p-2 hover:bg-green-50 rounded-lg transition-colors text-gray-400 hover:text-green-600"
                                title="افزودن زیردسته"
                            >
                                <HiPlus className="w-4 h-4" />
                            </button>
                        )}
                        <button
                            onClick={() => onEdit(category)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-gray-400 hover:text-blue-600"
                            title="ویرایش"
                        >
                            <HiPencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(category)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-600"
                            title="حذف"
                        >
                            <HiTrash className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <div className="bg-gray-25">
                    {category.children!.map((child) => (
                        <TreeNode
                            key={child.id}
                            category={child}
                            level={level + 1}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddChild={onAddChild}
                            onToggle={onToggle}
                            isExpanded={expandedNodes.has(child.id)}
                            expandedNodes={expandedNodes}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const CategoryTreeView = ({ categories, onEdit, onDelete, onAddChild }: CategoryTreeViewProps) => {
    const [expandedNodes, setExpandedNodes] = useState<Set<string | number>>(new Set())

    const handleToggle = (categoryId: string | number) => {
        const newExpanded = new Set(expandedNodes)
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId)
        } else {
            newExpanded.add(categoryId)
        }
        setExpandedNodes(newExpanded)
    }

    if (!categories || categories.length === 0) {
        return (
            <Card className="p-8">
                <div className="text-center text-gray-500">
                    <HiPhotograph className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">هیچ دسته‌بندی‌ای یافت نشد</p>
                    <p className="text-sm">برای شروع، دسته‌بندی جدیدی ایجاد کنید</p>
                </div>
            </Card>
        )
    }

    return (
        <Card className="overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">ساختار درختی دسته‌بندی‌ها</h2>
                <p className="text-sm text-gray-600 mt-1">
                    {categories.length} دسته‌بندی اصلی
                </p>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
                {categories.map((category) => (
                    <TreeNode
                        key={category.id}
                        category={category}
                        level={0}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onAddChild={onAddChild}
                        onToggle={handleToggle}
                        isExpanded={expandedNodes.has(category.id)}
                        expandedNodes={expandedNodes}
                    />
                ))}
            </div>
        </Card>
    )
}

export default CategoryTreeView