import type { ColorToken } from "@/lib/tokens";

export function Swatch({ token }: { token: ColorToken }) {
  return (
    <div className="flex gap-4 rounded-md border border-line-100 bg-surface-100 p-4">
      <div
        className="size-14 shrink-0 rounded-md border border-line-100"
        style={{ background: `var(--trc-${token.name})` }}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="m-0 font-mono text-body-sm text-ink-900">{token.name}</p>
        <p className="m-0 font-mono text-caption text-ink-500">
          {token.light}
          {token.dark !== token.light ? ` · ${token.dark}` : " · both themes"}
        </p>
        <p className="m-0 text-caption text-ink-700">{token.usage}</p>
      </div>
    </div>
  );
}
