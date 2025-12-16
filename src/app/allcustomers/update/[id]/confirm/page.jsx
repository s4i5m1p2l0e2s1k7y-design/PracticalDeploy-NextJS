"use client";

import OneCustomerInfoCard from "@/app/components/one_customer_info_card.jsx";
import fetchCustomer from "./../fetchCustomer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfirmPage({ params }) {
  const id = params?.id;
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAndSetCustomer = async () => {
      const customerData = await fetchCustomer(id);
      // fetchCustomerが配列を返すなら先頭を取る（仕様に合わせて調整）
      const one = Array.isArray(customerData) ? customerData[0] : customerData;
      setCustomer(one ?? null);
    };

    fetchAndSetCustomer();
  }, [id]);

  return (
    <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
      <div className="alert alert-success p-4 text-center">更新しました</div>

      {customer ? (
        <OneCustomerInfoCard {...customer} />
      ) : (
        <div className="p-4">読み込み中...</div>
      )}

      <div className="flex justify-center">
        <Link href="/allcustomers" className="btn btn-outline btn-accent">
          一覧に戻る
        </Link>
      </div>
    </div>
  );
}
