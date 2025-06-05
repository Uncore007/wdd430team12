export default function SellerDashboard() {
  const { data: session } = useSession();

  if (session?.user.role !== "seller") {
    return <p>You must be a seller to manage products.</p>;
  }

  return (
    <div>
      <h1>Manage Your Products</h1>
      {/* Add/Delete Products */}
    </div>
  );
}
