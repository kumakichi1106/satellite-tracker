import type { ReactNode } from 'react';

type AppLayoutProps = {
    sidebar: ReactNode;
    main: ReactNode;
};

export function AppLayout({ sidebar, main }: AppLayoutProps) {
    return (
        <main className="grid h-screen grid-cols-[420px_1fr] overflow-hidden bg-black text-white">
            <aside className="z-10 flex min-h-0 flex-col gap-4 border-r border-slate-800 bg-slate-950/95 p-4">
                {sidebar}
            </aside>

            <section className="min-h-0 overflow-hidden">
                {main}
            </section>
        </main>
    );
}