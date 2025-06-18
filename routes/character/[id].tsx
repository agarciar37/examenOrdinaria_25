import axios, { Axios } from "axios";
import { FreshContext, Handlers, type PageProps } from "$fresh/server.ts";
import CharacterContainer from "../../components/CharacterContainer.tsx";
import type { Character } from "../../components/CharacterCard.tsx";
import { readFavorites, saveFavorites, toggleFavorite } from "../../utils/favorites.ts";
import CharactersContainer from "../../components/CharactersContainer.tsx";

type Data = {
    character: Character;
    isFavorite: boolean;
}

export const handler: Handlers<Data> = {
    GET: async (req: Request, ctx: FreshContext) => {
        const {id} = ctx.params
        const url = `https://hp-api.onrender.com/api/character/${id}`
        try {
            const response = await axios.get<Character[]>(url);
            const characters = response.data
            const character = characters[0]
            const favorites = readFavorites(req)
            return ctx.render({character, favorites})
        } catch (e) {
            throw new Response ("Error de Api")
        }
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

const Page = (props: PageProps<Data>) => {
    const {character} = props.data
    return (
        <div>
            <CharacterContainer character={props.data.character} isFavorite={props.data.isFavorite}/>
            <a href="/">Back to list</a>
        </div>
    )
}

export default Page;