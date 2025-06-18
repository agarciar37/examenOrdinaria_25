import type { FunctionalComponent } from "preact";
import CharacterCard, {Character} from "./CharacterCard.tsx";

type Props = {
    characters: Character[]
    favorites: string[]
}

const CharactersContainer: FunctionalComponent<Props> = (props) => {
    const {characters, favorites} = props;

    return (
        <div class="charactersContainer">
            {characters.map((ch) => {
                <CharacterCard key={ch.id} character={ch} isFavorite={favorites.includes(ch.id)}/>
            })}
        </div>
    )
}

export default CharactersContainer;