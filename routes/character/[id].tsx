import axios, { Axios } from "axios";
import { FreshContext, Handlers } from "$fresh/server.ts";
import CharacterContainer from "../../components/CharacterContainer.tsx";

type Character = {
    id: string;
    name: string;
    image: string;
}

type Data = {
    character: Character;
}

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
        const {id} = ctx.params
        const url = `https://hp-api.onrender.com/api/character/${id}`
        try {
            const response = await axios.get<Character[]>(url);
            const characters = response.data
            const character = characters[0]
            return ctx.render({character})
        } catch (e) {
            throw new Response ("Error de Api")
        }
    }
}

const Page = (props: {data: Data}) => {
    const {character} = props.data
    return (
        <div>
            <CharacterContainer character = {props.data.character}/>
        </div>
    )
}

export default Page;