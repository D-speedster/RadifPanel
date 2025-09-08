import { useState } from 'react'
import { Card } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'
import { HiChevronRight, HiChevronDown, HiPencil, HiTrash, HiSelector, HiPhotograph } from 'react-icons/hi'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

interface Category {
    id: string
    name: string
    slug: string
    description?: string
    image?: string
    parentId?: string | null
    children?: Category[]
    productCount: number
    isExpanded?: boolean
    level?: number
}

interface CategoriesTableProps {
    categories: Category[]
    onEdit: (category: Category) => void
    onDelete: (category: Category) => void
    onReorder?: (categories: Category[]) => void
}

const CategoriesTable = ({ categories, onEdit, onDelete, onReorder }: CategoriesTableProps) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['1']))

    const toggleExpanded = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories)
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId)
        } else {
            newExpanded.add(categoryId)
        }
        setExpandedCategories(newExpanded)
    }

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination || !onReorder) {
            return
        }

        const items = Array.from(categories)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        onReorder(items)
    }

    // Flatten categories for drag and drop
    const flattenCategories = (cats: Category[], level: number = 0): Category[] => {
        let result: Category[] = []
        cats.forEach(cat => {
            result.push({ ...cat, level })
            if (cat.children && expandedCategories.has(cat.id)) {
                result = result.concat(flattenCategories(cat.children, level + 1))
            }
        })
        return result
    }

    const flatCategories = flattenCategories(categories)

    const renderCategoryRow = (category: Category, level: number = 0): JSX.Element[] => {
        const hasChildren = category.children && category.children.length > 0
        const isExpanded = expandedCategories.has(category.id)
        const indentStyle = { paddingRight: `${level * 2}rem` }

        const rows: JSX.Element[] = [
            <tr 
                key={category.id} 
                className="hover:bg-gray-50 transition-colors group"
                style={{
                    borderBottom: '1px solid #F7FAFC'
                }}
            >
                {/* نام دسته‌بندی */}
                <td className="py-4 px-0" style={indentStyle}>
                    <div className="flex items-center gap-3">
                        {hasChildren ? (
                            <button
                                onClick={() => toggleExpanded(category.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                style={{ color: '#A0AEC0' }}
                            >
                                {isExpanded ? (
                                    <HiChevronDown className="w-4 h-4" />
                                ) : (
                                    <HiChevronRight className="w-4 h-4" />
                                )}
                            </button>
                        ) : (
                            <div className="w-6" />
                        )}
                        <div 
                            className="flex items-center justify-center bg-gray-100"
                            style={{
                                width: '2.5rem',
                                height: '2.5rem',
                                borderRadius: '0.5rem'
                            }}
                        >
                            {category.image ? (
                                <Avatar
                                    size={32}
                                    src={category.image}
                                    alt={category.name}
                                    className="rounded-lg"
                                />
                            ) : (
                                <span 
                                    style={{ 
                                        color: '#A0AEC0',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {category.name.charAt(0)}
                                </span>
                            )}
                        </div>
                        <span 
                            className="font-medium"
                            style={{ 
                                color: '#1A202C',
                                fontSize: '0.9rem'
                            }}
                        >
                            {category.name}
                        </span>
                    </div>
                </td>
                
                {/* اسلاگ */}
                <td className="py-4 px-0">
                    <span 
                        className="font-mono"
                        style={{ 
                            color: '#A0AEC0',
                            fontSize: '0.8rem',
                            backgroundColor: '#F7FAFC',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.375rem'
                        }}
                    >
                        {category.slug}
                    </span>
                </td>
                
                {/* تعداد محصولات */}
                <td className="py-4 px-0">
                    <span 
                        className="font-semibold"
                        style={{ 
                            color: '#1A202C',
                            fontSize: '0.9rem'
                        }}
                    >
                        {category.productCount.toLocaleString()}
                    </span>
                </td>
                
                {/* عملیات */}
                <td className="py-4 px-0">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onEdit(category)}
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            style={{ color: '#A0AEC0' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#7A52F4'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#A0AEC0'}
                            title="ویرایش"
                        >
                            <HiPencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(category)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            style={{ color: '#A0AEC0' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#F87171'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#A0AEC0'}
                            title="حذف"
                        >
                            <HiTrash className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>
        ]

        // اضافه کردن ردیف‌های فرزند اگر باز باشد
        if (hasChildren && isExpanded) {
            category.children!.forEach(child => {
                rows.push(...renderCategoryRow(child, level + 1))
            })
        }

        return rows
    }

    return (
        <Card 
            className="bg-white"
            style={{
                padding: '1.75rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
                border: 'none'
            }}
        >
            <div className="overflow-x-auto">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <table className="w-full">
                        <thead>
                            <tr style={{ borderBottom: '1px solid #F7FAFC' }}>
                                <th 
                                    className="text-right py-3 px-0 text-xs font-medium"
                                    style={{ color: '#A0AEC0', width: '2rem' }}
                                >
                                    {/* Drag Handle */}
                                </th>
                                <th 
                                    className="text-right py-3 px-0 text-xs font-medium"
                                    style={{ color: '#A0AEC0' }}
                                >
                                    نام دسته‌بندی
                                </th>
                                <th 
                                    className="text-right py-3 px-0 text-xs font-medium"
                                    style={{ color: '#A0AEC0' }}
                                >
                                    اسلاگ
                                </th>
                                <th 
                                    className="text-right py-3 px-0 text-xs font-medium"
                                    style={{ color: '#A0AEC0' }}
                                >
                                    تعداد محصولات
                                </th>
                                <th 
                                    className="text-right py-3 px-0 text-xs font-medium"
                                    style={{ color: '#A0AEC0' }}
                                >
                                    عملیات
                                </th>
                            </tr>
                        </thead>
                        <Droppable droppableId="categories">
                            {(provided) => (
                                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                    {flatCategories.map((category, index) => (
                                        <Draggable key={category.id} draggableId={category.id} index={index}>
                                            {(provided, snapshot) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`hover:bg-gray-50 transition-colors ${
                                                        snapshot.isDragging ? 'bg-blue-50 shadow-lg' : ''
                                                    }`}
                                                    style={{
                                                        borderBottom: '1px solid #F7FAFC',
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    {/* Drag Handle */}
                                                    <td className="py-4 px-0">
                                                        <div 
                                                            {...provided.dragHandleProps}
                                                            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded transition-colors"
                                                            style={{ color: '#A0AEC0' }}
                                                        >
                                                            <HiSelector className="w-4 h-4" />
                                                        </div>
                                                    </td>
                                                    
                                                    {/* نام دسته‌بندی */}
                                                    <td className="py-4 px-0" style={{ paddingRight: `${(category.level || 0) * 2}rem` }}>
                                                        <div className="flex items-center gap-3">
                                                            {category.children && category.children.length > 0 ? (
                                                                <button
                                                                    onClick={() => toggleExpanded(category.id)}
                                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                                    style={{ color: '#A0AEC0' }}
                                                                >
                                                                    {expandedCategories.has(category.id) ? (
                                                                        <HiChevronDown className="w-4 h-4" />
                                                                    ) : (
                                                                        <HiChevronRight className="w-4 h-4" />
                                                                    )}
                                                                </button>
                                                            ) : (
                                                                <div className="w-6" />
                                                            )}
                                                            <div 
                                                                 className="flex items-center justify-center"
                                                                 style={{
                                                                     width: '2.5rem',
                                                                     height: '2.5rem',
                                                                     borderRadius: '0.5rem',
                                                                     backgroundColor: '#F8F9FC'
                                                                 }}
                                                             >
                                                                 {category.image ? (
                                                                     <Avatar
                                                                         size={32}
                                                                         src={category.image}
                                                                         alt={category.name}
                                                                         className="rounded-lg"
                                                                     />
                                                                 ) : (
                                                                     <HiPhotograph 
                                                                         className="w-5 h-5"
                                                                         style={{ color: '#A0AEC0' }}
                                                                     />
                                                                 )}
                                                             </div>
                                                            <span 
                                                                className="font-medium"
                                                                style={{ 
                                                                    color: '#1A202C',
                                                                    fontSize: '0.9rem'
                                                                }}
                                                            >
                                                                {category.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    
                                                    {/* اسلاگ */}
                                                    <td className="py-4 px-0">
                                                        <span 
                                                            className="font-mono"
                                                            style={{ 
                                                                color: '#A0AEC0',
                                                                fontSize: '0.8rem',
                                                                backgroundColor: '#F7FAFC',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: '0.375rem'
                                                            }}
                                                        >
                                                            {category.slug}
                                                        </span>
                                                    </td>
                                                    
                                                    {/* تعداد محصولات */}
                                                    <td className="py-4 px-0">
                                                        <span 
                                                            className="font-semibold"
                                                            style={{ 
                                                                color: '#1A202C',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            {category.productCount.toLocaleString()}
                                                        </span>
                                                    </td>
                                                    
                                                    {/* عملیات */}
                                                    <td className="py-4 px-0">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => onEdit(category)}
                                                                className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                                style={{ color: '#A0AEC0' }}
                                                                onMouseEnter={(e) => e.currentTarget.style.color = '#7A52F4'}
                                                                onMouseLeave={(e) => e.currentTarget.style.color = '#A0AEC0'}
                                                                title="ویرایش"
                                                            >
                                                                <HiPencil className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => onDelete(category)}
                                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                                style={{ color: '#A0AEC0' }}
                                                                onMouseEnter={(e) => e.currentTarget.style.color = '#F87171'}
                                                                onMouseLeave={(e) => e.currentTarget.style.color = '#A0AEC0'}
                                                                title="حذف"
                                                            >
                                                                <HiTrash className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            )}
                        </Droppable>
                    </table>
                </DragDropContext>
            </div>
        </Card>
    )
}

export default CategoriesTable