import { NextApiRequest, NextApiResponse } from "next";
import { Crawler, Page } from "crawler";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { supabaseAdminClient } from "utils/supabaseAdmin";
import { TokenTextSplitter } from "langchain/text_splitter";
import { summarizeLongDocument } from "./summarizer";

const truncateStringByBytes = (str, bytes) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

export default async function handler(req, res) {
  const { query } = req;
  const { urls: urlString, limit, indexName, summmarize } = query;
  const urls = urlString.split(",");
  console.log('urls')
  console.log(urls);
  const crawlLimit = parseInt(limit) || 100;
  const shouldSummarize = summmarize === "true";

  const crawler = new Crawler(urls, crawlLimit, 200);
  const pages = (await crawler.start());
  const documentCollection = await Promise.all(
    pages.map(async (row) => {
      const splitter = new TokenTextSplitter({
        encodingName: "gpt2",
        chunkSize: 300,
        chunkOverlap: 20,
      });

      const pageContent = shouldSummarize
        ? await summarizeLongDocument({ document: row.text })
        : row.text;

      const docs = splitter.splitDocuments([
        new Document({
          pageContent,
          metadata: {
            url: row.url,
            text: truncateStringByBytes(pageContent, 36000),
          },
        }),
      ]);
      return docs;
    })
  );

  try {
    const embeddings = new OpenAIEmbeddings();

    const store = new SupabaseVectorStore(embeddings, {
      client: supabaseAdminClient,
      tableName: "documents",
    });

    try {
      await Promise.all(
        documentCollection.map(async (documents) => {
          await store.addDocuments(documents);
        })
      );

      res.status(200).json({ message: "Done" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: `Error ${JSON.stringify(e)}` });
    }
  } catch (e) {
    console.log(e);
  }
}
