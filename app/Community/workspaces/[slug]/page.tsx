import Workspace from './workspace-page';
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <Workspace slug={(await params).slug} roster={false} />;
}
