import { useEffect, useState } from "react";

export function Picture({
  sources = [],
  src,
  alt = "",
  onError,
  ...imgProps
}) {
  const [failed, setFailed] = useState(false);
  const sourceKey = sources.map((item) => item.srcSet).join("|");

  useEffect(() => {
    setFailed(false);
  }, [src, sourceKey]);

  // If assets are not exported yet, the CSS gradient remains visible.
  if (failed) return null;

  return (
    <picture>
      {sources.map((source) => (
        <source key={source.media} media={source.media} srcSet={source.srcSet} />
      ))}
      <img
        src={src}
        alt={alt}
        onError={(event) => {
          setFailed(true);
          onError?.(event);
        }}
        {...imgProps}
      />
    </picture>
  );
}
