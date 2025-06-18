import { getCookies, setCookie } from "$std/http/cookie.ts"

export function readFavorites(req: Request): string[] {
    const cookies = getCookies(req.headers)
    const raw = cookies.favorites
    if (!raw) return []
    return raw.split(',').filter((id) => id)
}

export function saveFavorites (headers: Headers, favorites: string[]) {
    setCookie(headers, {name: "favorites", value: favorites.join(','), path: '/'})
}

export function toggleFavorite(favorites: string[], id: string): string[] {
    if (favorites.includes(id)){
        return favorites.filter((f) => f !== id)
    }
    return [...favorites, id]
}