import { createServerClient } from "@supabase/auth-helpers-remix";
import type { SupabaseClient } from "@supabase/supabase-js";

export default class SupabaseServices {
  public supabaseClient: SupabaseClient;
  constructor(request: Request) {
    const response = new Response();
    this.supabaseClient = createServerClient(
      process.env.SUPABASE_URL || "",
      process.env.SUPABASE_ANON_KEY || "",
      { request, response }
    );
  }
}
