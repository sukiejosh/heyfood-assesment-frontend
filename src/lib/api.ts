const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Restaurant {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  rating: string;
  reviewCount: number;
  deliveryTime?: string;
  deliveryFee?: string;
  minimumOrder?: string;
  isActive: boolean;
  isOpen: boolean;
  address?: string;
  phone?: string;
  email?: string;
  openingTime?: string;
  closingTime?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  restaurantCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface RestaurantListResponse {
  success: boolean;
  data: Restaurant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search?: string;
    tags?: string | string[];
    sortBy?: string;
    sortOrder?: string;
  };
}

export interface TagListResponse {
  success: boolean;
  data: Tag[];
  total: number;
}

export interface RestaurantFilters {
  search?: string;
  tags?: string[];
  sortBy?: 'rating' | 'reviewCount' | 'deliveryTime' | 'deliveryFee' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// API client with error handling
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success && data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

// Restaurant API functions
export async function getRestaurants(filters?: RestaurantFilters): Promise<RestaurantListResponse> {
  const params = new URLSearchParams();
  
  if (filters?.search) {
    params.append('search', filters.search);
  }
  
  if (filters?.tags && filters.tags.length > 0) {
    filters.tags.forEach(tag => params.append('tags', tag));
  }
  
  if (filters?.sortBy) {
    params.append('sortBy', filters.sortBy);
  }
  
  if (filters?.sortOrder) {
    params.append('sortOrder', filters.sortOrder);
  }
  
  if (filters?.page) {
    params.append('page', filters.page.toString());
  }
  
  if (filters?.limit) {
    params.append('limit', filters.limit.toString());
  }

  const queryString = params.toString();
  const endpoint = queryString ? `/restaurants?${queryString}` : '/restaurants';
  
  return apiRequest<RestaurantListResponse>(endpoint);
}

export async function getRestaurantById(id: number): Promise<ApiResponse<Restaurant>> {
  return apiRequest<ApiResponse<Restaurant>>(`/restaurants/${id}`);
}

// Tag API functions
export async function getTags(): Promise<TagListResponse> {
  return apiRequest<TagListResponse>('/tags');
}

export async function getPopularTags(): Promise<TagListResponse> {
  return apiRequest<TagListResponse>('/tags/popular');
}

export async function getTagById(id: number): Promise<ApiResponse<Tag>> {
  return apiRequest<ApiResponse<Tag>>(`/tags/${id}`);
}

// Search functions for the search overlay
export async function searchRestaurants(query: string, tags?: string[]): Promise<Restaurant[]> {
  try {
    const response = await getRestaurants({
      search: query,
      tags: tags,
      limit: 20
    });
    
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export async function getRestaurantsByTag(tagName: string): Promise<Restaurant[]> {
  try {
    const response = await getRestaurants({
      tags: [tagName],
      limit: 20
    });
    
    return response.data;
  } catch (error) {
    console.error('Tag filter error:', error);
    return [];
  }
}