export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "An error occurred" }));
        throw new Error(error.message || "Fetch failed");
    }

    return res.json() as Promise<T>;
}

export const api = {
    get: <T>(url: string, options?: RequestInit) => fetcher<T>(url, { ...options, method: "GET" }),
    post: <T>(url: string, body: any, options?: RequestInit) =>
        fetcher<T>(url, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        }),
    put: <T>(url: string, body: any, options?: RequestInit) =>
        fetcher<T>(url, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        }),
    delete: <T>(url: string, options?: RequestInit) => fetcher<T>(url, { ...options, method: "DELETE" }),
};
