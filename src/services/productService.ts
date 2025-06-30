import axios from 'axios';
import { ProductListItem, ProductDetail } from '@/types/Product';

const apiClient = axios.create({
  baseURL: 'https://prueba-tecnica-api-tienda-moviles.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
  },
});

export const productService = {
  getProducts: async (search?: string): Promise<ProductListItem[]> => {
    try {
      const response = await apiClient.get('/products', {
        params: { search },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  getProductById: async (id: string): Promise<ProductDetail> => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product with id: ${id}:`, error);
      throw error;
    }
  },
};
