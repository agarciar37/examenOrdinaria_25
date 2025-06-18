import type { Character } from "../components/CharacterCard.tsx";
import type { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { readFavorites, saveFavorites, toggleFavorite } from "../utils/favorites.ts";
import CharactersContainer from "../components/CharactersContainer.tsx";

type Data = {
    characters: Character[]
    favorites: string[]
}

async function fCharacters(): Promise<Character[]> {
    const url = "https://hp-api.onrender.com/api/characters"
    const res = await fetch(url)
    const characters: Character[] = await res.json();
    return characters;
}

export const handler: Handlers<Data> = {
    GET: async (req: Request, ctx: FreshContext) =>  {
        const favorites = readFavorites(req)
        const all = await fCharacters();
        const characters = all.filter((ch) => favorites.includes(ch.id))
        return ctx.render({characters, favorites})
    }, 
    POST: async (req) => {
        const form = await req.formData();
        const id = form.get("id")
        const favorites = readFavorites(req)
        const newFavs = toggleFavorite (favorites, String(id))
        const headers = new Headers();
        saveFavorites(headers, newFavs)
        headers.set("Location", "/favorites")
        return new Response (null, {status: 303, headers})
    }
}

export default function Page (props: PageProps<Data>){
    return (
        <div>
            <CharactersContainer characters={props.data.characters} favorites={props.data.favorites}/>
        </div>
    )
}