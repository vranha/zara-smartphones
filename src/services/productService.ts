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
  getProducts: async (search?: string, signal?: AbortSignal): Promise<ProductListItem[]> => {
    try {
      const response = await apiClient.get('/products', {
        params: { search },
        signal, // Pasar el AbortSignal a axios
      });
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error('Error al cargar productos');
    }
  },

  getProductById: async (id: string, signal?: AbortSignal): Promise<ProductDetail> => {
    try {
      const response = await apiClient.get(`/products/${id}`, {
        signal, // Pasar el AbortSignal a axios
      });
      if (!response.data) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product with id: ${id}:`, error);
      throw new Error(`Error al cargar producto ${id}`);
    }
  },
};
