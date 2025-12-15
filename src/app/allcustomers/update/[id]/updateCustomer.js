"use client";

export default async function updateCustomer(formData) {
  const updated_customer_name = formData.get("customer_name");
  const updated_customer_id = formData.get("customer_id");
  const updated_age = parseInt(formData.get("age"));
  const updated_gender = formData.get("gender");

  const body_msg = JSON.stringify({
    customer_name: updated_customer_name,
    customer_id: updated_customer_id,
    age: updated_age,
    gender: updated_gender,
  });

  console.log("UPDATE API_ENDPOINT:", process.env.NEXT_PUBLIC_API_ENDPOINT);
  console.log(
    "UPDATE URL:",
    process.env.NEXT_PUBLIC_API_ENDPOINT + "/allcustomers/update"
  );
  
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/allcustomers/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      },
    body: body_msg,
    }
   );
   if (!res.ok) {
      const text = await res.text(); // エラー内容を取得
      console.error("Server Error:", text);
      throw new Error("Failed to update customer");
    }

    return await res.json(); // 成功時
    } catch (error) {
    console.error("updateCustomer Error:", error);
    throw error;
  }
}