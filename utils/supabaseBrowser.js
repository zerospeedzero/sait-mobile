import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from "types/supabase";

const supabaseBrowserClient = createClientComponentClient({
  options: {
    realtime: {
      params: {
        eventsPerSecond: -1,
      },
    },
  },
});

export { supabaseBrowserClient };
