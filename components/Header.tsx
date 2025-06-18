import { FunctionComponent } from "preact";

const Header:FunctionComponent = () => {
    return (
        <header>
            <nav>
                <a href="/">All characters</a> | <a href="/favorites">Favoritos</a>
            </nav>
        </header>
    )
}

export default Header;