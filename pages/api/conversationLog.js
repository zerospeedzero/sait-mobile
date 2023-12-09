import { supabaseAdminClient } from "utils/supabaseAdmin";

class ConversationLog {
  constructor(userId) {
    this.userId = userId;
  }

  async addEntry({ entry, speaker }) {
    try {
      await supabaseAdminClient
        .from("conversations")
        .insert({ user_id: this.userId, entry, speaker })
        .throwOnError();
    } catch (e) {
      console.log(`Error adding entry: ${e}`);
    }
  }

  async getConversation({ limit }) {
    const { data: history } = await supabaseAdminClient
      .from("conversations")
      .select("entry, speaker, created_at")
      .eq("user_id", this.userId)
      .order("created_at", { ascending: false })
      .limit(limit)
      .throwOnError();

    const response = history
      ? history
          .map((entry) => {
            return `${entry.speaker.toUpperCase()}: ${entry.entry}`;
          })
          .reverse()
      : [];
    return response;
  }

  async clearConversation() {
    await supabaseAdminClient
      .from("conversations")
      .delete()
      .eq("user_id", this.userId)
      .throwOnError();
  }
}

export { ConversationLog };
