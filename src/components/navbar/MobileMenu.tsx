import { useEffect, useState } from "react";

interface NavItem {
    label: string;
    to: string;
}

interface Props {
    items: NavItem[];
}

export default function MobileMenu({ items }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    // Close the menu when switching to desktop.
    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 701px)");

        const handleChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setIsOpen(false);
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    // Prevent background scrolling while menu is open.
    useEffect(() => {
        document.body.classList.toggle("menu-open", isOpen);

        return () => {
            document.body.classList.remove("menu-open");
        };
    }, [isOpen]);

    // Allow Escape to close the menu.
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <>
            <button
                className={`menu-toggle ${isOpen ? "is-open" : ""}`}
                type="button"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsOpen((open) => !open)}
            >
                <span />
                <span />
                <span />
            </button>

            <div
                className={`mobile-menu ${isOpen ? "is-open" : ""}`}
                id="mobile-menu"
                aria-hidden={!isOpen}
            >
                <div className="mobile-menu-inner">
                    <nav className="mobile-nav-links" aria-label="Mobile navigation">
                        {items.map((item, index) => (
                            <a
                                href={item.to}
                                className="mobile-nav-link"
                                onClick={() => setIsOpen(false)}
                            >
                                <span className="mobile-nav-label">
                                    {item.label}
                                </span>

                                <span className="mobile-nav-arrow">
                                    ↗
                                </span>
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    );
}
