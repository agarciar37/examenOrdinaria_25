import type { FunctionalComponent } from "preact";
import type { Character } from "./CharacterCard.tsx";

type Props = {
    character: Character;
    isFavorite: boolean;
}

const CharacterContainer: FunctionalComponent<Props> = (props) => {
    const {id, name, image} = props.character;
    return (
        <div>
            <img src={image} alt={name}/>
            <div>{name}</div>
            <form method="post">
                <input type="hidden" name="id" value={id}/>
                <button type="submit">{props.isFavorite ? "Unfavorite" : "Favorite"}</button>
            </form>
        </div>
    )
}

export default CharacterContainer;