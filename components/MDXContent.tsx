import * as runtime from "react/jsx-runtime";

const components = {
  h2: (p: React.ComponentProps<"h2">) => (
    <h2 className="font-display font-bold text-xl text-text-primary mt-12 mb-4" {...p} />
  ),
  h3: (p: React.ComponentProps<"h3">) => (
    <h3 className="font-display font-bold text-lg text-text-primary mt-8 mb-3" {...p} />
  ),
  p: (p: React.ComponentProps<"p">) => <p className="text-text-muted leading-relaxed mb-5" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => (
    <ul className="list-disc pl-5 space-y-2 text-text-muted leading-relaxed mb-5 marker:text-accent" {...p} />
  ),
  ol: (p: React.ComponentProps<"ol">) => (
    <ol className="list-decimal pl-5 space-y-2 text-text-muted leading-relaxed mb-5 marker:text-accent" {...p} />
  ),
  a: (p: React.ComponentProps<"a">) => (
    <a className="text-accent underline underline-offset-4 hover:text-accent-light" {...p} />
  ),
  strong: (p: React.ComponentProps<"strong">) => <strong className="text-text-primary font-semibold" {...p} />,
  blockquote: (p: React.ComponentProps<"blockquote">) => (
    <blockquote className="border-l-2 border-accent pl-4 italic text-text-muted mb-5" {...p} />
  ),
  code: (p: React.ComponentProps<"code">) => (
    <code className="font-mono text-[0.85em] text-accent-light bg-raised rounded-xs px-1.5 py-0.5" {...p} />
  ),
  pre: (p: React.ComponentProps<"pre">) => (
    <pre
      className="font-mono text-sm bg-surface border border-border rounded-xs p-4 overflow-x-auto mb-5 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-text-primary"
      {...p}
    />
  ),
};

// Velite compiles MDX to a function body at build time (our own repo content, never user input); evaluate it with the JSX runtime.
export default function MDXContent({ code }: { code: string }) {
  const Component = new Function(code)({ ...runtime }).default;
  return <Component components={components} />;
}
