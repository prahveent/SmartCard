export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  isActive?: boolean;
}

export interface CreateProductRequest {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

export interface UpdateProductRequest {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  isActive?: boolean;
}
