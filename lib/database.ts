import { supabase } from './supabase';
import { BusinessApplication, BusinessApplicationInsert } from '@/types/database';

/**
 * Insert a new business application into the database
 */
export async function createBusinessApplication(data: BusinessApplicationInsert) {
  const { data: result, error } = await supabase
    .from('business_applications')
    .insert({
      business_name: data.business_name,
      industry: data.industry,
      email: data.email,
      phone_number: data.phone_number || null,
      current_situation: data.current_situation,
      goal: data.goal,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create business application: ${error.message}`);
  }

  return result as BusinessApplication;
}

/**
 * Get all business applications (admin only)
 */
export async function getAllBusinessApplications() {
  const { data, error } = await supabase
    .from('business_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch business applications: ${error.message}`);
  }

  return data as BusinessApplication[];
}

/**
 * Get a business application by ID
 */
export async function getBusinessApplicationById(id: string) {
  const { data, error } = await supabase
    .from('business_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch business application: ${error.message}`);
  }

  return data as BusinessApplication;
}

/**
 * Get business applications by email
 */
export async function getBusinessApplicationsByEmail(email: string) {
  const { data, error } = await supabase
    .from('business_applications')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch business applications: ${error.message}`);
  }

  return data as BusinessApplication[];
}

/**
 * Get count of approved business applications
 */
export async function getApprovedApplicationsCount() {
  const { count, error } = await supabase
    .from('business_applications')
    .select('*', { count: 'exact', head: true })
    .eq('isApproved', true);

  if (error) {
    throw new Error(`Failed to fetch approved applications count: ${error.message}`);
  }

  return count || 0;
}
