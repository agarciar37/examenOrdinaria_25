import type { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "axios"
import { CSP_CONTEXT } from "$fresh/runtime.ts";
import CharactersContainer from "../components/CharactersContainer.tsx";
import type { Character } from "../components/CharacterCard.tsx";
import { readFavorites, saveFavorites, toggleFavorite } from "../utils/favorites.ts";

type Data = {
  characters: Character[]
  favorites: string[]
}

export const handler: Handlers<Data> = {
  GET: async (req: Request, ctx: FreshContext) => {
    const url = "https://hp-api.onrender.com/api/characters";
    const response = await axios.get<Character[]>(url);
    const characters = response.data;
    const favorites = readFavorites(req);
    return ctx.render({ characters, favorites });
  }, POST: async (req: Request) => {
    const form = await req.formData()
    const id = form.get("id")
    const favorites = readFavorites(req)
    const newFavs = toggleFavorite(favorites, String(id))
    const headers = new Headers()
    saveFavorites(headers, newFavs)
    headers.set("Location", "/")
    return new Response (null, {status: 303, headers})
  }
}

export default function Page (props: PageProps<Data>) {
  return (
    <div>
      <CharactersContainer characters={props.data.characters} favorites={props.data.favorites}/>
    </div>
  )
}