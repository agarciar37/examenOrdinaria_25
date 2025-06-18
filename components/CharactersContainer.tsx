import type { FunctionalComponent } from "preact";
import CharacterCard from "./CharacterCard.tsx";

type Character = {
    id: string;
    name: string;
    image: string;
}

type Props = {
    characters: Character[]
}

const CharactersContainer: FunctionalComponent<Props> = (props) => {
    const characters = props.characters;

    return (
        <>
            <div class="charactersContainer">
                {characters.map((ch) => (<a href={`character/${ch.id}`}><CharacterCard key={ch.id} character={ch}/></a>))}
            </div>
        </>
        )
}


export default CharactersContainer;