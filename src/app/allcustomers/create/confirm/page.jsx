import Link from "next/link";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./fetchCustomer";

export default async function ConfirmPage({ searchParams }) {
  const customer_id = searchParams?.customer_id;

  if (!customer_id) {
    return (
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-error p-4 text-center">
          customer_id が指定されていません
        </div>
        <Link className="btn btn-primary m-4 text-2xl" href="/allcustomers">
          戻る
        </Link>
      </div>
    );
  }

  const customer = await fetchCustomer(customer_id);

  if (!customer) {
    return (
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-error p-4 text-center">
          顧客情報の取得に失敗しました
        </div>
        <Link className="btn btn-primary m-4 text-2xl" href="/allcustomers">
          戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">
        正常に作成しました
      </div>

      <OneCustomerInfoCard {...customer} />

      <Link className="btn btn-primary m-4 text-2xl" href="/allcustomers">
        戻る
      </Link>
    </div>
  );
}
