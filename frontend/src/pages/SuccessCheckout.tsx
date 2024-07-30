import axios from "@/api/Base/axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const { profile } = useAuth();
  const pdfPopupRef = useRef(null);

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const sessionId = new URLSearchParams(location.search).get("session_id");

  useOutsideAlerter(pdfPopupRef, () => setPdfUrl(null));

  useEffect(() => {
    async function fetchData() {
      if (!sessionId) return;

      try {
        const response = await axios.get(`/order/session/${sessionId}`);
        const { metadata, line_items } = response.data;

        setOrderData({
          ...metadata,
          LineItems: line_items.data
            .filter((item) => item.description !== "Shipping Fee")
            .map(({ description, price, quantity }) => ({
              ProductDescription: description,
              ProductPrice: price.unit_amount,
              ProductQuantity: quantity,
            })),
        });

        setShippingFee(
          line_items.data.find((item) => item.description === "Shipping Fee")
            ?.price.unit_amount ?? null
        );
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng:", error);
      }
    }

    fetchData();
  }, [sessionId]);

  const totalPrice = useMemo(
    () =>
      orderData?.LineItems.reduce(
        (acc, item) => acc + item.ProductPrice * item.ProductQuantity,
        0
      ) ?? 0,
    [orderData]
  );

  const handlePrintInvoicePdf = useCallback(async () => {
    if (!orderData) return;

    try {
      const response = await axios.post("/order/create-order-pdf", {
        ...orderData,
        ShippingFee: shippingFee,
        CurrentSuccessUrl: window.location.href,
      });

      const { pdfData, contentType } = response.data;
      const binaryData = atob(pdfData);
      const bytes = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: contentType });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Lỗi khi tạo PDF:", error);
    }
  }, [orderData, shippingFee]);

  return (
    <div className="min-h-screen bg-[#E6E8EA]">
      <div className="flex justify-center items-center">
        <img
          className="my-8 xl:w-[270px] md:w-[150px] w-[130px]"
          src="/logo.webp"
          alt=""
        />
      </div>
      <SuccessMessage className="xl:hidden md:flex-row flex flex-col justify-center mb-4" />
      <div className="container-app flex xl:flex-row flex-col  gap-4">
        <div className="xl:w-[50%]">
          <SuccessMessage className="hidden xl:flex" />
          <OrderInfo orderData={orderData} profile={profile ?? null} />
        </div>
        <div className="xl:w-[50%] order-first xl:order-none">
          <OrderSummary
            orderData={orderData}
            totalPrice={totalPrice}
            shippingFee={shippingFee}
          />
        </div>
      </div>
      <div className="flex justify-center items-center my-4">
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
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] z-50"
            ref={pdfPopupRef}
          >
            <div className="w-full h-full bg-white">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={pdfUrl}
                  plugins={[defaultLayoutPluginInstance]}
                />
              </Worker>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
