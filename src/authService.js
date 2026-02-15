import { supabase } from './supabaseClient';

/**
 * SIGN UP
 * Registers a new user with email and password.
 */
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

/**
 * LOG IN
 * Authenticates an existing user.
 */
export const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

/**
 * LOG OUT
 */
export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};