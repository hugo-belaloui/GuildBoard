import { Link, NavLink } from "react-router-dom";

// Link to= "" : react-router-dom tag replacing href=""
// NavLink : same as Link, but knows if its "to" matches the current URL,
// letting us style the active page differently (className as a function)

export function NavBar() {
    return (
        <nav className="flex items-center justify-between border-b border-blue-200 bg-white px-4 py-3">
            <Link to="/" className="font-bold text-blue-700">Guild Manager</Link>
            <div className="flex gap-4">
                <NavLink
                    to="/adventurers"
                    className={({ isActive }) => isActive ? "text-blue-900 font-bold underline" : "text-blue-700 font-semibold"}
                >
                    Adventurers
                </NavLink>
                <NavLink
                    to="/quests"
                    className={({ isActive }) => isActive ? "text-blue-900 font-bold underline" : "text-blue-700 font-semibold"}
                >
                    Quests
                </NavLink>
            </div>
        </nav>
    );
}