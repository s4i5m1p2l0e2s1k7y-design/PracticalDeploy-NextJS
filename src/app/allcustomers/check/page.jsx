import Link from "next/link";
import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";

async function fetchCustomer(customer_id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/allcustomers?customer_id=${encodeURIComponent(
        customer_id
      )}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0] ?? null; // 配列なら先頭を返す
  } catch {
    return null;
  }
}

export default async function ReadPage({ searchParams }) {
  const customer_id = searchParams?.customer_id;

  if (!customer_id) {
    return (
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-error">customer_id が指定されていません</div>
        <Link className="btn btn-outline btn-accent mt-4" href="/allcustomers">
          一覧に戻る
        </Link>
      </div>
    );
  }

  const customer = await fetchCustomer(customer_id);

  if (!customer) {
    return (
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-error">顧客情報の取得に失敗しました</div>
        <Link className="btn btn-outline btn-accent mt-4" href="/allcustomers">
          一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="alert alert-success">更新しました</div>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customer} />
      </div>
      <Link className="btn btn-outline btn-accent" href="/allcustomers">
        一覧に戻る
      </Link>
    </>
  );
}
