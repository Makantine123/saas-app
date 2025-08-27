'use server';

import { withAuth } from '@workos-inc/authkit-nextjs';
import { createSupabaseClient } from '../supabase';

export const createCompanion = async (formData: CreateCompanion) => {
  const { accessToken, user } = await withAuth();
  const author = user?.id;
  const supabase = createSupabaseClient(accessToken);

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

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const { accessToken } = await withAuth();
  const supabase = createSupabaseClient(accessToken);

  let query = supabase.from('companion').select();

  if (subject && topic) {
    query = query
      .ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`);
  } else if (topic) {
    query = query.ilike('topic', `%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) {
    throw new Error(error.message || 'Error fetching companions');
  }

  return companions;
};

export const getCompanion = async (id: string) => {
  const { accessToken } = await withAuth();
  const supabase = createSupabaseClient(accessToken);

  const { data: companion, error } = await supabase
    .from('companion')
    .select()
    .eq('id', id);

  if (error) {
    throw new Error(error.message || 'Error fetching companion');
  }

  return companion[0];
};

export const addToSessionHistory = async (companionId: string) => {
  try {
    const { user } = await withAuth();
    const { accessToken } = await withAuth();
    const supabase = createSupabaseClient(accessToken);
    const author = user?.id;

    const { data, error } = await supabase.from('session_history').insert({
      companion_id: companionId,
      user_id: author,
    });

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentSessions = async (limit = 10) => {
  try {
    const { accessToken } = await withAuth();
    const supabase = createSupabaseClient(accessToken);

    const { data, error } = await supabase
      .from('session_history')
      .select(`companions:companion_id (*)`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
  } catch (error) {
    console.log(error);
  }
};

export const getUserSessions = async (limit = 10) => {
  try {
    const { user } = await withAuth();
    const author = user?.id;
    const { accessToken } = await withAuth();
    const supabase = createSupabaseClient(accessToken);

    const { data, error } = await supabase
      .from('session_history')
      .select(`companions:companion_id (*)`)
      .eq('user_id', author)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
  } catch (error) {
    console.log(error);
  }
};

export const getUserCompanions = async () => {
  try {
    const { user } = await withAuth();
    const author = user?.id;
    const { accessToken } = await withAuth();
    const supabase = createSupabaseClient(accessToken);

    const { data, error } = await supabase
      .from('companion')
      .select()
      .eq('author', author);

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getBookmarkedCompanions = async () => {
//   try {
//     const { user } = await withAuth();
//     const author = user?.id;
//     const { accessToken } = await withAuth();
//     const supabase = createSupabaseClient(accessToken);

//     const { data, error } = await supabase
//       .from('bookmarks')
//       .select(`companions:companion_id (*)`) // Notice the (*) to get all the companion data
//       .eq('user_id', author);

//     if (error) throw new Error(error.message);

//     return data.map(({ companions }) => companions);
//   } catch (error) {
//     console.log(error);
//   }
// };
