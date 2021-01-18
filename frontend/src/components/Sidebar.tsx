import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllCategories } from '../features/categorySlice'

export interface Category {
  _id: string
  name: string
}

const Sidebar = () => {
  const categories = useSelector(selectAllCategories)

  return (
    <>
      {categories.map((category: Category) => (
        <li key={category._id}>
          <Link to={`/category/${category._id}`}>{category.name}</Link>
        </li>
      ))}
    </>
  )
}

export default Sidebar
