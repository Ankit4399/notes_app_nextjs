import { fetchNotes } from "@/lib/note";

export default async function Home() {
  const notes = await fetchNotes();

  return 
}
