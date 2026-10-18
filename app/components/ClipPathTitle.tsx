
"use client";

type ClipPathTitleProps = {
  title: string;
  color: string;
  bg: string;
  className?: string;
  borderColor?: string;
};

export default function ClipPathTitle({
  title,
  color,
  bg,
  className = "",
  borderColor = "transparent",
}: ClipPathTitleProps) {
  return (
    <div className="general-title">
      <div
        className={`clip-title ${className}`}
        style={{
          backgroundColor: bg,
          color,
          borderColor,
          clipPath:
            "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          opacity: 0,
        }}
      >
        <h2>{title}</h2>
      </div>
    </div>
  );
}
