import DiagnoseResultPage from "@/features/diagnose-result";

export default function DiagnoseResult({ params }: { params: { id: string } }) {
  return <DiagnoseResultPage id={Number(params.id)} />;
}
