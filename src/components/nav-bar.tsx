import { ModeToggle } from "./mode-toggle";

export default function NavBar() {
    return (
        <div className="absolute w-full h-auto bg-secondary border-b-2 border-border p-2">
            <ModeToggle />
        </div>
    );
}