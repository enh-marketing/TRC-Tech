import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h2: ({ children }) => <h2 className="mt-14 mb-4 text-heading-lg text-ink-900">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-10 mb-3 text-heading-md text-ink-900">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-8 mb-2 text-heading-sm text-ink-900">{children}</h4>,
  p: ({ children }) => <p className="my-4 max-w-[72ch] text-body text-ink-700">{children}</p>,
  ul: ({ children }) => (
    <ul className="my-4 flex max-w-[72ch] list-disc flex-col gap-2 ps-6 text-body text-ink-700 marker:text-accent-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 flex max-w-[72ch] list-decimal flex-col gap-2 ps-6 text-body text-ink-700 marker:text-ink-500">
      {children}
    </ol>
  ),
  strong: ({ children }) => <strong className="font-semibold text-ink-900">{children}</strong>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="text-accent-700 underline underline-offset-2 hover:text-ink-900"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  code: ({ children }) => (
    <code className="rounded-sm bg-surface-300 px-1.5 py-0.5 font-mono text-body-sm text-ink-900">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-md border border-line-100 bg-surface-200 p-4 font-mono text-body-sm text-ink-900 [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-body-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-line-200 py-2 pe-4 align-bottom text-field-label text-ink-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line-100 py-2 pe-4 align-top text-ink-700">{children}</td>
  ),
  hr: () => <hr className="my-10 border-line-100" />,
};

export function Prose({ source }: { source: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </Markdown>
  );
}
