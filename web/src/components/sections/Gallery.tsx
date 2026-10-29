"use client";

import Image from "next/image";
import { useState } from "react";

/** Main image with thumbnails, used when a model has more than one photo. */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        <Image src={images[active]} alt={alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
      </div>
      <div className="mt-3 grid grid-cols-5 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${alt} ${i + 1}`}
            aria-pressed={i === active}
            className={`relative aspect-[4/3] overflow-hidden bg-sand-200 outline-offset-2 ${i === active ? "ring-2 ring-green-700" : "opacity-70 hover:opacity-100"}`}
          >
            <Image src={src} alt="" fill sizes="12vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
