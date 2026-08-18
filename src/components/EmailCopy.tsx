import { useState } from "react";

interface EmailCopyProps {
    email: string;
}

export default function EmailCopy({ email }: EmailCopyProps) {
    const [copied, setCopied] = useState(false);
    const [username, domain] = email.split("@");

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(email);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            console.error("Failed to copy email address.");
        }
    }

    return (
        <>
            <button
                className={`footer-link primary email-copy ${copied ? "copied" : ""
                    }`}
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
            >
                <span className="email-address">
                    <span>{username}</span>
                    <span> [at] </span>
                    <span>{domain.replace(".", " [dot] ")}</span>
                </span>

                <span className="copy-status">
                    {copied ? "Copied!" : "Copy"}
                </span>
            </button>

            <style>{`
                .email-copy {
                    cursor: pointer;
                    font-family: inherit;
                    text-align: left;
                }

                .email-address {
                    overflow-wrap: anywhere;
                }

                .copy-status {
                    flex-shrink: 0;
                    color: var(--color-accent);
                    transition: color 200ms ease;
                }

                .email-copy.copied .copy-status {
                    color: #fff;
                }
            `}</style>
        </>
    );
}
