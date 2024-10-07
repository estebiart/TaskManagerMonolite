export interface FormValues {
    title: string;
    description?: string; 
    deadline: string; 
    status: 'pending' | 'in_progress' | 'completed'; 
    priority?: 'low' | 'medium' | 'high'; 
    user_id: number; 
  }
  