import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity, deleteCartItem } from "@/store/shop/cart-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { formatPriceWithTax } from "@/lib/utils";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  // Carousel state
  const images =
    product?.images && product.images.length > 0
      ? product.images
      : [product?.image];
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (!images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [images]);

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Find if product is in cart
  const cartItem = cartItems?.items?.find((item) => item.productId === product._id);

  function handleUpdateQuantity(type) {
    if (!user) {
      toast({
        title: "Please login to manage your cart",
        description: "You need to be logged in to update cart items",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    
    if (!cartItem) return;
    const newQty = type === "plus" ? cartItem.quantity + 1 : cartItem.quantity - 1;
    if (newQty < 1) return;
    dispatch(updateCartQuantity({
      userId: user?.id,
      productId: product._id,
      quantity: newQty,
    }));
  }

  function handleRemoveFromCart() {
    if (!user) {
      toast({
        title: "Please login to manage your cart",
        description: "You need to be logged in to remove cart items",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    
    if (!cartItem) return;
    dispatch(deleteCartItem({ userId: user?.id, productId: product._id }));
  }

  function handleAddToCartClick() {
    if (!user) {
      toast({
        title: "Please login to add items to cart",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }
    handleAddtoCart(product?._id, product?.totalStock);
  }

  return (
    <Card className="w-full mx-auto h-full flex flex-col">
      <div 
        onClick={() => handleGetProductDetails(product?._id)}
        className="flex-grow"
      >
        <div className="relative">
          <img
            src={images[currentImage]}
            alt={product?.title}
            className="w-full object-cover rounded-t-lg"
            style={{ aspectRatio: "3 / 4", height: "auto" }}
          />
          {/* Carousel dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentImage ? "bg-primary" : "bg-gray-300"
                  }`}
                  style={{ display: "inline-block" }}
                ></span>
              ))}
            </div>
          )}
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
              {`Only ${product?.totalStock} left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs sm:text-sm">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-2 sm:p-4">
          <h2 className="text-sm sm:text-base font-bold mb-1 sm:mb-2 line-clamp-2">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-xs sm:text-sm text-muted-foreground">
              {product?.category}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {product?.subcategory}
            </span>
          </div>
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <div className="flex flex-col">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-sm sm:text-base font-semibold text-primary`}
              >
                ₹{formatPriceWithTax(product?.price).displayPrice}
              </span>
              {product?.salePrice > 0 && (
                <span className="text-sm sm:text-base font-semibold text-primary">
                  ₹{formatPriceWithTax(product?.salePrice).displayPrice}
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                Inclusive of taxes
              </span>
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-2 sm:p-4">
        {product?.totalStock === 0 ? (
          <Button className="w-full text-xs sm:text-sm opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : cartItem ? (
          <div className="flex items-center w-full gap-2 justify-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={cartItem.quantity === 1}
              onClick={(e) => {
                e.stopPropagation();
                handleUpdateQuantity("minus");
              }}
            >
              -
            </Button>
            <span className="font-semibold text-base w-8 text-center">
              {cartItem.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={cartItem.quantity >= product.totalStock}
              onClick={(e) => {
                e.stopPropagation();
                handleUpdateQuantity("plus");
              }}
            >
              +
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromCart();
              }}
            >
              x
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCartClick}
            className="w-full text-xs sm:text-sm"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;