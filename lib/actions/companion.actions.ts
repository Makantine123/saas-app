'use server';

import { CreateCompanion } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { createSupabaseClient } from '../supabase';

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('companion')
    .insert({ ...formData, author })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Error creating companion');
  }

  return data;
};
