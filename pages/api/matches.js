import { SupabaseClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";

export const getMatchesFromEmbeddings = async (
  inquiry,
  client,
  topK
) => {
  const embeddings = new OpenAIEmbeddings();

  const store = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
  });

  try {
    const queryResult = await store.similaritySearch(inquiry, topK);
    return (
      queryResult.map((match) => ({
        ...match,
        metadata: match.metadata,
      })) || []
    );
  } catch (e) {
    console.log("Error querying embeddings: ", e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};
