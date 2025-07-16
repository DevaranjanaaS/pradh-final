import { CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4 py-12">
      <CheckCircle2 className="text-green-500 mb-4" size={72} />
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Thank you for your purchase.<br />
        Your order has been placed successfully.
      </p>
      <Button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
        onClick={() => navigate("/shop/account")}
      >
        View My Orders
      </Button>
    </div>
  );
}
