import {Link} from "react-router-dom";

export default function Header() {
    return (
        <nav className="bg-primary text-black">
            <div className="container px-8 lg:px-0 py-4">
                <Link to={'/'} className="font-medium text-xl">Gigih Play</Link>
            </div>
        </nav>
    );
}