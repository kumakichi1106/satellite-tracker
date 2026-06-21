import type { ReactNode } from 'react';

type AppLayoutProps = {
    sidebar: ReactNode;
    main: ReactNode;
    detail: ReactNode;
};

export function AppLayout({
    sidebar,
    main,
    detail,
}: AppLayoutProps) {
    return (
        <main className="flex h-screen overflow-hidden bg-black text-white">
            <aside className="flex min-h-0 w-96 shrink-0 flex-col gap-4 border-r border-slate-800 bg-slate-950/95 p-4">
                {sidebar}
            </aside>

            <section className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <div className="min-h-0 flex-1 overflow-hidden">
                    {main}
                </div>

                <div className="max-h-80 shrink-0 border-t border-slate-800 bg-slate-950/95">
                    {detail}
                </div>
            </section>
        </main>
    );
}