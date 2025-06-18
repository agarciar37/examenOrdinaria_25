import { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function layout ({Component}: PageProps) {
    return (
        <div class="Layout">
            <Header/>
            <div>
                <Component/>
            </div>
        </div>
    )
}