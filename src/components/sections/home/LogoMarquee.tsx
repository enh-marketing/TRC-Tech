import Image from "next/image";

export type MarqueeLogo = { name: string; src: string; width: number; height: number };

/**
 * A continuous strip of logos. It pauses on hover, and with reduced motion
 * set it does not move at all: the logos wrap into centred rows instead.
 */
export function LogoMarquee({ logos }: { logos: (MarqueeLogo & { box: { width: number; height: number } })[] }) {
  const copy = (hidden: boolean) => (
    <ul
      className="marquee-copy m-0 flex shrink-0 list-none items-center gap-14 p-0 pe-14 sm:gap-20 sm:pe-20"
      aria-hidden={hidden || undefined}
    >
      {logos.map((logo) => (
        <li key={logo.name} className="flex h-14 shrink-0 items-center">
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.name}
            width={logo.box.width}
            height={logo.box.height}
            style={{ width: logo.box.width, height: logo.box.height }}
            className="logo-mono object-contain"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee marquee-fade overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
