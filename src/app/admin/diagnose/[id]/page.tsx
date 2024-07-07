import AdminDiagnoseDetailPage from "@/features/admin-diagnose-symptoms";

const AdminDiagnoseDetail = ({ params }: { params: { id: string } }) => {
  return <AdminDiagnoseDetailPage id={Number(params.id)} />;
};

export default AdminDiagnoseDetail;
