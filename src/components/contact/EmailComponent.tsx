import { useState } from "react";
import { site } from "../../config/site";

const { email } = site.contacts;

export default function EmailComponent() {
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
                className={`email-copy ${copied ? "copied" : ""
                    }`}
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
            >
                <span className="email-address">
                    <span>{username}</span>
                    <span>[at]</span>
                    <span>{domain.replace(".", "[dot]")}</span>
                </span>

                <span className="copy-status">
                    {copied ? "Copied!" : "Copy"}
                </span>
            </button>
        </>
    );
}
