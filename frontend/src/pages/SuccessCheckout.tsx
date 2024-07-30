import axios from "@/api/Base/axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { FaPrint } from "react-icons/fa";
import { SuccessMessage } from "@/components/SuccessCheckout/SucessMessage";
import { OrderInfo } from "@/components/SuccessCheckout/OrderInfo";
import { OrderSummary } from "@/components/SuccessCheckout/OrderSummary";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useOutsideAlerter } from "@/hooks/useOutsideAlerter";

interface OrderData {
  Address: string;
  CouponId: string;
  DeliveryTime: string;
  District: string;
  Email: string;
  FullName: string;
  Note: string;
  OrderDate: string;
  PaymentMethodId: string;
  PhoneNumber: string;
  Province: string;
  ShippingMethodId: string;
  UserId: string;
  Ward: string;
  LineItems: {
    ProductDescription: string;
    ProductPrice: number;
    ProductQuantity: number;
  }[];
}

export function SuccessCheckout() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get("session_id");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const { profile } = useAuth();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const pdfPopupRef = useRef(null);
  useOutsideAlerter(pdfPopupRef, () => setPdfUrl(null));

  useEffect(() => {
    async function fetchData() {
      if (sessionId) {
        const response = await axios.get(`/order/session/${sessionId}`);
        setOrderData({
          ...response.data.metadata,
          LineItems: response.data.line_items.data
            .filter((item) => item.description !== "Shipping Fee")
            .map((item) => ({
              ProductDescription: item.description,
              ProductPrice: item.price.unit_amount,
              ProductQuantity: item.quantity,
            })),
        });
        setShippingFee(
          response.data.line_items.data.find(
            (item) => item.description === "Shipping Fee"
          )?.price.unit_amount
        );
      }
    }

    fetchData();
  }, [location.search, sessionId]);

  const totalPrice = orderData?.LineItems.reduce(
    (acc, item) => acc + item.ProductPrice * item.ProductQuantity,
    0
  );

  async function handlePrintInvoicePdf() {
    const response = await axios.post("/order/create-order-pdf", {
      Address: orderData?.Address,
      CouponId: orderData?.CouponId,
      DeliveryTime: orderData?.DeliveryTime,
      District: orderData?.District,
      Email: orderData?.Email,
      FullName: orderData?.FullName,
      Note: orderData?.Note,
      OrderDate: orderData?.OrderDate,
      PaymentMethodId: orderData?.PaymentMethodId,
      PhoneNumber: orderData?.PhoneNumber,
      Province: orderData?.Province,
      ShippingMethodId: orderData?.ShippingMethodId,
      UserId: orderData?.UserId,
      Ward: orderData?.Ward,
      LineItems: orderData?.LineItems.map((item) => {
        return {
          ProductDescription: item.ProductDescription,
          ProductPrice: item.ProductPrice,
          ProductQuantity: item.ProductQuantity,
        };
      }),
      ShippingFee: shippingFee,
      CurrentSuccessUrl: window.location.href,
    });

    // Lấy dữ liệu base64 từ phản hồi
    const { pdfData, contentType } = response.data;

    // Chuyển đổi base64 thành Uint8Array
    const binaryData = atob(pdfData);
    const bytes = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i);
    }

    // Tạo blob từ Uint8Array
    const blob = new Blob([bytes], { type: contentType });

    // Tạo Url cho Blob
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  }

  return (
    <div className="min-h-screen bg-[#E6E8EA]">
      <div className="flex justify-center items-center">
        <img
          width={270}
          height={270}
          className="my-8"
          src="/logo.webp"
          alt=""
        />
      </div>
      <div className="container-app flex gap-4">
        <div className="w-[50%]">
          <SuccessMessage />
          <OrderInfo orderData={orderData} profile={profile ?? null} />
        </div>
        <div className="w-[50%]">
          <OrderSummary
            orderData={orderData}
            totalPrice={totalPrice}
            shippingFee={shippingFee}
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Button
          size={"none"}
          variant={"none"}
          className="bg-[#357EBD] text-white px-8 py-5 rounded-[10px] hover:bg-[#2b6daa] mr-4"
        >
          Tiếp tục mua hàng
        </Button>
        <Button size={"none"} variant={"none"} onClick={handlePrintInvoicePdf}>
          <FaPrint className="w-8 h-8 text-[#2a9dcc]" />
          <div className="text-[#2a9dcc] text-xl font-bold ml-2">
            In hóa đơn
          </div>
        </Button>
      </div>
      {pdfUrl && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-70 z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] z-50" ref={pdfPopupRef}>
            <div className="w-full h-full bg-white">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
              </Worker>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
