import { createServerClient } from "@supabase/auth-helpers-remix";
import { SupabaseClient } from "@supabase/supabase-js";

export default class SupabaseServices {

    private supabaseClient: SupabaseClient;
    constructor(request: Request){
        const response = new Response();
      this.supabaseClient  = createServerClient(
            process.env.SUPABASE_URL || "",
            process.env.SUPABASE_ANON_KEY || "",
            { request, response }
          );
    }

    createSearch =async(search: any)=>{
        try {
            
        } catch (error) {
            console.error(error)//debug
        }
    }
}