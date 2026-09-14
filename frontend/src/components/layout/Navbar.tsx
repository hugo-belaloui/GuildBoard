import { Link } from "react-router-dom"; 

// Link to= "" : react-router-dom tag replacing href="" 

export function NavBar() { 
    return (
        <nav className="flex items-center justify-between border-b border-blue-200 bg-white px-4 py-3">
            <Link to="/" className="font-bold text-blue-700">Guild Manager</Link>
            <div className="flex gap-4">
                <Link to="/adventurers" className="text-blue-700 font-semibold">Adventurers</Link>
                <Link to="/quests" className="text-blue-700 font-semibold">Quests</Link>
            </div>
        </nav>
    );
}