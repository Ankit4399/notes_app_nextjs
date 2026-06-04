export type Note = {
    id: string
    title: string
    content: string
    category: string
    createdAt: string
}

export async function fetchNotes() {
    const res = await fetch('http://localhost:3000/api/notes', {
        cache: 'no-store',
    });

    console.log('Status:', res.status);

    const json = await res.json();

    console.log('Response:', json);

    return json.data;
}