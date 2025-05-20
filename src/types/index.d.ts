import type { PageProps } from '@inertiajs/core'
import type { LucideIcon } from 'lucide-vue-next'
import type { Config } from 'ziggy-js'

export interface Auth {
  user: User
  token: string
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  isActive?: boolean
}

export interface SharedData extends PageProps {
  name: string
  quote: { message: string; author: string }
  auth: Auth
  ziggy: Config & { location: string }
  sidebarOpen: boolean
}

export interface Role {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  fullName: string
  email: string
  avatar?: string
  role: Role
  emailVerifiedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Item {
  id: number
  name: string
  description?: string
  statusColor: string
  createdAt: string
  updatedAt: string
}

export type BreadcrumbItemType = BreadcrumbItem
