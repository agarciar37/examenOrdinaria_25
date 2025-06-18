import type { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "axios"
import { CSP_CONTEXT } from "$fresh/runtime.ts";
import CharactersContainer from "../components/CharactersContainer.tsx";

type Character = {
  id: string;
  name: string;
  image: string;
}

type Data = {
  characters: Character[]
}

type State = {
  characters: Character[]
}

export const handler: Handlers<Data, State> = {
  GET: async (_req: Request, ctx: FreshContext<State, Data>) => {
    const ch = ctx.state.characters
    const url = "https://hp-api.onrender.com/api/characters"
    try {
      const response = await axios.get<Character[]>(url)
      const characters = response.data;
      if (!characters) {
        return new Response ("No characters found", {status: 400})
      }
      return ctx.render({characters})
    } catch (e) {
      return new Response ("Error", {status: 500})
    }
  }
}

export default function Page (props: PageProps<{charactes: Character[]}>) {
  return (
    <div>
      <CharactersContainer characters = {props.data.charactes}/>
    </div>
  )
}