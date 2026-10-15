import { createFileRoute } from "@tanstack/react-router";
import { Scrapbook } from "@/components/scrapbook/Scrapbook";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Anshika!" },
      { name: "description", content: "A little handmade birthday scrapbook, made just for Anshika." },
      { property: "og:title", content: "Happy Birthday, Anshika!" },
      { property: "og:description", content: "A little surprise, just for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Scrapbook,
});
