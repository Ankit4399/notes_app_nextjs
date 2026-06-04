export type Note = {
    id: string
    title: string
    content: string
    category: string
    createdAt: string
}

export function getBaseUrl() {
    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export async function fetchNotes() {
    const res = await fetch(`${getBaseUrl()}/notes`, {
        cache: 'no-store',
    });

    console.log('Status:', res.status);

    const json = await res.json();

    console.log('Response:', json);

    return json.data;
}