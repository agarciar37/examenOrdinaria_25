import type { FunctionalComponent } from "preact";

export type Character = {
    id: string;
    name: string;
    image: string;
}

type Props = {
    character: Character;
    isFavorite: boolean;
}

const CharacterCard: FunctionalComponent<Props> = (props) => {
    const {id, name, image} = props.character;
    return (
        <div>
            <a href={`character/${id}`}>
                <img src={image} alt={name}/>
                <div>{name}</div>
            </a>
            <form method="post">
                <input type="hidden" name="id" value={id}/>
                <button type="submit">{props.isFavorite ? "Unfavorite" : "Favorite"}</button>
            </form>
        </div>
    )
}

export default CharacterCard;