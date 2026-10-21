import ProjectDetail from "@/components/admin/ProjectDetail";
export const metadata = { title: "Project · Axony CRM", robots: { index: false, follow: false } };
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <ProjectDetail id={id} />; }
