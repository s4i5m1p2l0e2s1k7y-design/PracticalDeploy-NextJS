import Link from "next/link";

export default function ConfirmPage({ params, searchParams }) {
  // URL が /allcustomers/delete/123/confirm の場合
  const idFromParams = params?.id;

  // ?customer_id=123 のようなクエリがある場合にも対応
  const idFromQuery = searchParams?.customer_id;

  const customer_id = idFromParams ?? idFromQuery;

  if (!customer_id) {
    return (
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <div className="alert alert-error p-4 text-center">
          customer_id が取得できませんでした
        </div>
        <Link href="/allcustomers" className="flex justify-center">
          <button className="btn btn-outline btn-accent">一覧に戻る</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center text-white">
        {customer_id} を削除しました
      </div>
      <Link href="/allcustomers" className="flex justify-center">
        <button className="btn btn-outline btn-accent">一覧に戻る</button>
      </Link>
    </div>
  );
}
