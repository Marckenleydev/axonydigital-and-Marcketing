import ClientDetail from "@/components/admin/ClientDetail";
export const metadata = { title: "Client · Axony CRM", robots: { index: false, follow: false } };
export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ClientDetail id={id} />; }
