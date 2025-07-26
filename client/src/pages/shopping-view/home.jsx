import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import { useNavigate } from "react-router-dom";
import UserCartWrapper from "@/components/shopping-view/cart-wrapper";
import ReviewCarousel from "@/components/common/ReviewCarousel";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];

// About Us image sections (copied from about-us.jsx)
const aboutUsImageSections = [
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540547/Soft_silk_sarees_bwtpu7.jpg",
    alt: "Soft Silk Sarees",
    title: "Soft Silk Sarees",
    description:
      "Our soft silk sarees combine elegance and comfort, perfect for both everyday wear and special occasions. With vibrant colors and rich textures, they reflect timeless tradition with a modern twist.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540548/TUSSAR_SILK_s6kdgu.jpg",
    alt: "Tussar Silk Sarees",
    title: "Tussar Silk Sarees",
    description:
      "Tussar Silk sarees boast rich texture and organic tones, representing a timeless Indian tradition. Their unique sheen and feel make them ideal for festive occasions and elegant events.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540551/Kalamkari_Dupata_ppmob9.jpg",
    alt: "Kalamkari Dupattas",
    title: "Kalamkari Dupattas",
    description:
      "Hand-painted and block-printed Kalamkari dupattas that tell stories through fabric art. Each design celebrates mythology and nature, blending craftsmanship with storytelling.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540551/Linen_Sarees_izcsim.jpg",
    alt: "Linen Sarees",
    title: "Linen Sarees",
    description:
      "Breathable and elegant, Linen Sarees offer a minimal yet sophisticated look. Perfect for summer outings and casual events, they bring style with comfort and simplicity.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540548/ORGANZA_SILK_evitrx.jpg",
    alt: "Organza Sarees",
    title: "Organza Sarees",
    description:
      "Organza Sarees are known for their sheer texture and ethereal beauty. With lightweight fabric and delicate embroidery, they add grace and glamour to any celebration.",
  },
   {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540552/Kalamkari_Sarees_ekxtxu.jpg",
    alt: "Kalamkari Sarees",
    title: "Kalamkari Sarees",
    description:
      "Kalamkari Sarees feature hand-painted or block-printed motifs inspired by mythology and nature. A canvas of tradition, they blend storytelling and style effortlessly.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540551/Chanderi_Sarees_llpla2.jpg",
    alt: "Chanderi Sarees",
    title: "Chanderi Sarees",
    description:
      "Known for their glossy texture and lightweight feel, Chanderi Sarees are woven with silk and cotton. They reflect royalty, often adorned with zari and traditional patterns.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540549/Fancy_silk_sarees_dh6axb.jpg",
    alt: "Fancy Silk Sarees",
    title: "Fancy Silk Sarees",
    description:
      "With vibrant hues and contemporary designs, Fancy Silk Sarees cater to modern tastes. Perfect for parties and gatherings, they balance trendiness with elegance.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540547/TERRACOTA_JEWELARY_k7tzib.jpg",
    alt: "Terracotta Jewelry",
    title: "Terracotta Jewelry",
    description:
      "Explore handcrafted terracotta jewelry that adds a touch of earthy sophistication to any outfit. Each piece is carefully molded and painted, offering a rustic charm rooted in Indian heritage.",
  },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { cartItems } = useSelector((state) => state.shopCart);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
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

    // Find the product in productList to get totalStock
    const product = productList.find((item) => item._id === getCurrentProductId);
    const totalStock = product?.totalStock ?? 0;

    // Get cart items from redux
    const getCartItems = cartItems?.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > totalStock) {
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    if (featureImageList && featureImageList.length > 1) {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
      }, 5000); // Reduced to 5 seconds for better user experience

    return () => clearInterval(timer);
    }
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");
  console.log(featureImageList, "featureImageList");
  console.log(currentSlide, "currentSlide");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter banners to only those with a valid image for the current view
  const filteredFeatureImages = featureImageList
    ? featureImageList.filter((slide) =>
        isMobile ? !!slide?.imageMobile : !!slide?.imageDesktop
      )
    : [];

  // For mobile view, show cart at the bottom of home page
  const cartArray = cartItems?.items || [];

  function MobileCartBar({ cartItems, onCheckout }) {
    const total = cartItems.reduce(
      (sum, item) =>
        sum + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
      0
    );
    
    const handleCheckout = () => {
      if (!user) {
        toast({
          title: "Please login to checkout",
          description: "You need to be logged in to complete your purchase",
          variant: "destructive",
        });
        navigate("/auth/login");
        return;
      }
      onCheckout();
    };
    
    return (
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-bold">Cart: {cartItems.length} item(s)</span>
        <span className="font-bold">₹{total}</span>
        <Button size="sm" onClick={handleCheckout} className="ml-2">Checkout</Button>
      </div>
    );
  }

  // Get the last 8 products, prioritizing in-stock, then filling with out-of-stock if needed
  let inStock = (productList || []).filter((p) => (p.totalStock ?? 0) > 0).reverse();
  let outOfStock = (productList || []).filter((p) => (p.totalStock ?? 0) <= 0);
  let combined = [...outOfStock, ...inStock];
  let last8 = combined.slice(-8).reverse();

  return (
    <div className="flex flex-col min-h-screen mt-16">
      <div className="relative w-full h-[600px] overflow-hidden">
        {filteredFeatureImages && filteredFeatureImages.length > 0 ? (
          filteredFeatureImages.map((slide, index) => (
            <img
              src={isMobile ? slide?.imageMobile : slide?.imageDesktop}
              alt={slide?.alt || "Feature banner"}
              key={"feature-image-" + (slide?._id || index)}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
            />
          ))
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-lg">No feature images available</p>
          </div>
        )}
        {/* Modern Carousel Indicators */}
        {filteredFeatureImages && filteredFeatureImages.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {filteredFeatureImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-primary/50
                  ${index === currentSlide
                    ? "bg-primary border-primary scale-125 shadow-lg opacity-100"
                    : "bg-white/70 border-white hover:scale-110 opacity-70"}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* About Us Image Section - Side by side, alternating, responsive */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-8 text-primary drop-shadow-lg tracking-tight">
            Our Collections
          </h2>
          <div className="flex flex-col gap-12">
            {aboutUsImageSections.map((section, idx) => {
              const isEven = idx % 2 === 0;
              // Replace spaces with plus for subcategory filter, do NOT add a plus at the end
              const subcategoryParam = section.title.replace(/\s+/g, '+');
              return (
                <div
                  key={idx}
                  onClick={() => navigate(`/shop/listing?subcategory=${subcategoryParam}`)}
                  className={`group cursor-pointer flex flex-col md:flex-row items-center md:items-stretch rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 hover:border-primary/40 overflow-hidden relative bg-white ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="md:w-1/2 w-full h-56 md:h-80 relative overflow-hidden flex-shrink-0">
                    <img
                      src={section.src}
                      alt={section.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
                  </div>
                  <div className="md:w-1/2 w-full flex flex-col justify-center p-6 md:p-10 text-left">
                    <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-secondary transition-colors duration-200">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-base mb-4">
                      {section.description}
                    </p>
                    <span className="inline-block text-sm font-semibold text-primary group-hover:underline group-hover:text-secondary transition-colors duration-200">
                      View Products
                    </span>
                  </div>
                  <span className="absolute top-3 right-3 bg-primary text-white text-xs px-3 py-1 rounded-full shadow group-hover:bg-secondary transition-colors duration-200">
                    Explore
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
            {last8.length > 0
              ? last8.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      {/* Show cart at the bottom on mobile view */}
      {isMobile && cartArray.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-lg mx-auto">
            <MobileCartBar cartItems={cartArray} onCheckout={() => navigate("/shop/checkout")} />
          </div>
        </div>
      )}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      {/* --- Customer Reviews Section --- */}
      <ReviewCarousel />
    </div>
  );
}

export default ShoppingHome;
