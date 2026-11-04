import { useEffect, useState } from "react";

type AvatarProps = {
    src: string;
    alt: string;
    fallbackText?: string;
};

export function Avatar({ src, alt, fallbackText ="DL" }: AvatarProps) {
    const [failed, setFailed] = useState(false);

    useEffect(() => setFailed(false), [src]);

    return (
        <div 
            className="flex size-28 items-center 
            justify-center overflow-hidden 
            rounded-full bg-[var(--surface)]">
        {failed ? (
            <span role="img" aria-label={alt}>
            {fallbackText}
            </span>
        ) : (
            <img
            src={src}
            alt={alt}
            width={112}
            height={112}
            className="size-full rounded-full object-cover"
            onError={() => setFailed(true)}
            />
        )}
        </div>
    )

}
