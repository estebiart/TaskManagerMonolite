import axios, { AxiosResponse } from 'axios';
import { Item } from '../interfaces/Item.interface';
import { BehaviorSubject } from 'rxjs';
import { store } from '@/redux/store/store';

const itemsSubject = new BehaviorSubject<Item[]>([]);
const paginationSubject = new BehaviorSubject<any>({});

export const items$ = itemsSubject.asObservable();
export const pagination$ = paginationSubject.asObservable();

export const fetchItems = async (
  page: number = 1,
  status?: string,
  priority?: string
): Promise<Item[]> => {
  try {
    const state = store.getState();
    const access_token = state.user.token;

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const url = `http://127.0.0.1:8000/api/tasks?page=${page}${status ? `&state=${status}` : ''}${priority ? `&priority=${priority}` : ''}`;

    const response: AxiosResponse<{ data: Item[], current_page: number, last_page: number, total: number }> = await axios.get(url, config);
    
    itemsSubject.next(response.data.data);
    paginationSubject.next({
      current_page: response.data.current_page,
      last_page: response.data.last_page,
      total: response.data.total
    });

    console.log("Response:", response.data);

    return response.data.data; 
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; 
  }
};


export const addItem = async (newItem: Omit<Item, 'id' | 'user_id'>): Promise<Item> => {
  try {
    const state = store.getState();
    const access_token = state.user.token; 
    const user_id = state.user.id;

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, 
      },
    };

    const itemWithUserId = { ...newItem, user_id: user_id }; 
    
    const response: AxiosResponse<Item> = await axios.post('http://127.0.0.1:8000/api/tasks', itemWithUserId, config);
    
    const currentItems = itemsSubject.getValue();
    itemsSubject.next([...currentItems, response.data]); 

    return response.data; 
  } catch (error) {
    console.error("Error adding item:", error);
    throw error; 
  }
};

export const fetchItemsByUser = async (userId: number): Promise<Item[]> => {
  try {
    const state = store.getState();
    const access_token = state.user.token; 

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    const response: AxiosResponse<{ data: Item[] }> = await axios.get(`http://127.0.0.1:8000/api/tasks?user_id=${userId}`, config);
    
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
