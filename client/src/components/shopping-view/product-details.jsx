import { X, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
  import { Button } from "../ui/button";
  import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart, fetchCartItems, updateCartQuantity, deleteCartItem } from "@/store/shop/cart-slice";
  import { useToast } from "../ui/use-toast";
  import { setProductDetails } from "@/store/shop/products-slice";
  import YoutubeEmbed from "../common/YoutubeEmbed";
  import { useEffect, useState, useRef } from "react";
  import { useNavigate } from "react-router-dom";

  function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const navigate = useNavigate();

    const { toast } = useToast();



    function handleAddToCart(getCurrentProductId, getTotalStock) {
      // Check if user is authenticated
      if (!user) {
        toast({
          title: "Please login to add items to cart",
          description: "You need to be logged in to add items to your cart",
          variant: "destructive",
        });
        navigate("/auth/login");
        return;
      }

      let getCartItems = cartItems.items || [];

      if (getCartItems.length) {
        const indexOfCurrentItem = getCartItems.findIndex(
          (item) => item.productId === getCurrentProductId
        );
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this item`,
              variant: "destructive",
            });

            return;
          }
        }
      }
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is added to cart",
          });
        }
      });
    }

    function handleDialogClose() {
      setOpen(false);
      dispatch(setProductDetails());
    }



    function handlePolicyClick() {
      navigate("/shop/about-us#policies");
    }

    // Find if product is in cart
    const cartItem = cartItems?.items?.find((item) => item.productId === productDetails?._id);

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
        productId: productDetails._id,
        quantity: newQty,
      })).then(() => dispatch(fetchCartItems(user?.id)));
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
      dispatch(deleteCartItem({ userId: user?.id, productId: productDetails._id }))
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchCartItems(user?.id));
            toast({ title: "Removed from cart" });
          }
        });
    }

    return (
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent
          className="p-0 max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[1200px] max-h-[95vh] overflow-y-auto"
        >
          <DialogTitle className="sr-only">Product Details</DialogTitle>
          <DialogDescription className="sr-only">View detailed information about this product</DialogDescription>
          {/* Close Button */}
          {/*<button
            onClick={handleDialogClose}
            className="absolute right-4 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 top-4 sm:top-4 mt-8 sm:mt-0"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>*/}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 min-h-full">
            {/* Product Images Carousel */}
            <div className="relative overflow-hidden rounded-xl bg-gray-50 p-4">
              {productDetails?.images && productDetails.images.length > 0 ? (
                <ProductImagesCarousel images={productDetails.images} title={productDetails?.title} />
              ) : (
                <img
                  src={productDetails?.image}
                  alt={productDetails?.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </div>

            {/* Product Details */}
            <div className="relative flex flex-col p-6">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {productDetails?.title}
              </h1>

              {/* Price Section - Modern E-commerce Style */}
              <div className="mb-6 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-baseline gap-3 mb-3">
                  {productDetails?.salePrice > 0 ? (
                    <>
                      <span className="text-3xl md:text-4xl font-bold text-green-600">
                        ₹{productDetails?.salePrice}
                      </span>
                      <span className="text-xl md:text-2xl font-medium text-gray-500 line-through">
                        ₹{productDetails?.price}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        {Math.round(((productDetails?.price - productDetails?.salePrice) / productDetails?.price) * 100)}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl md:text-4xl font-bold text-primary">
                      ₹{productDetails?.price}
                    </span>
                  )}
                </div>
                
                {productDetails?.salePrice > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-600">You save:</span>
                    <span className="text-lg font-bold text-red-600">
                      ₹{productDetails?.price - productDetails?.salePrice}
                    </span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Truck className="w-4 h-4" />
                    <span>Secure shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>1-day return policy</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {productDetails?.description}
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="mb-6">
                {productDetails?.totalStock === 0 ? (
                  <Button className="w-full h-12 text-lg font-semibold bg-gray-400 cursor-not-allowed">
                    Out of Stock
                  </Button>
                ) : cartItem ? (
                  <div className="flex items-center w-full gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      disabled={cartItem.quantity === 1}
                      onClick={() => handleUpdateQuantity("minus")}
                    >
                      -
                    </Button>
                    <span className="font-semibold text-lg w-10 text-center">
                      {cartItem.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10"
                      disabled={cartItem.quantity >= productDetails.totalStock}
                      onClick={() => handleUpdateQuantity("plus")}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 text-red-500"
                      onClick={handleRemoveFromCart}
                    >
                      x
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg"
                    onClick={() =>
                      handleAddToCart(
                        productDetails?._id,
                        productDetails?.totalStock
                      )
                    }
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                )}
              </div>

              {/* YouTube Video Preview */}
              {productDetails?.youtubeLink && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Video</h3>
                  <YoutubeEmbed 
                    url={productDetails.youtubeLink} 
                    title={`${productDetails?.title} - Product Video`}
                  />
                </div>
              )}

              {/* Return Policy */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Return Policy
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Note: There mighy be slight variations in the product images due to lighting and screen settings.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    We offer a 1-day return policy for all products. If you're not completely satisfied with your purchase, 
                    you can initiate a return within 1 day for a refund or exchange. Items must be in original condition with all tags attached.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full text-primary border-primary hover:bg-primary hover:text-white"
                    onClick={handlePolicyClick}
                  >
                    View Full Policies
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Enhanced Carousel component for product images
  function ProductImagesCarousel({ images, title }) {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef();

    useEffect(() => {
      if (!images || images.length <= 1) return;
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(intervalRef.current);
    }, [images]);

    return (
      <div className="relative group">
        <img
          src={images[current]}
          alt={title}
          className="w-full h-auto object-cover rounded-lg transition-opacity duration-500"
        />
        
        {/* Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current 
                    ? "bg-white scale-125 shadow-lg" 
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
            {current + 1} / {images.length}
          </div>
        )}
      </div>
    );
  }

  export default ProductDetailsDialog;