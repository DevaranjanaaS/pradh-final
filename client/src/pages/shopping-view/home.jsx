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
import { formatPriceWithTax } from "@/lib/utils";
import { API_BASE_URL } from "@/config";
import VairaaKaivannam from '@/assets/Video.mov';

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
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1754913320/WhatsApp_Image_2025-08-07_at_11.38.01_AM_gg06zs.jpg",
    alt: "Kanchipuram Silk Sarees",
    title: "Kanchipuram Silk Sarees",
    description:
      "Kanchipuram Silk sarees are renowned for their vibrant colors, intricate zari work, and unmatched durability. Woven from pure mulberry silk, they symbolize South India's rich cultural heritage and are a preferred choice for weddings and grand celebrations.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540547/Soft_silk_sarees_bwtpu7.jpg",
    alt: "Kanchipuram Soft Silk Sarees",
    title: "Kanchipuram Soft Silk Sarees",
    description:
      "Our soft silk sarees combine elegance and comfort, perfect for both everyday wear and special occasions. With vibrant colors and rich textures, they reflect timeless tradition with a modern twist.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540548/ORGANZA_SILK_evitrx.jpg",
    alt: "Organza Sarees",
    title: "Organza Sarees",
    description:
      "Organza Sarees are known for their sheer texture and ethereal beauty. With lightweight fabric and delicate embroidery, they add grace and glamour to any celebration.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1754911644/cotton_4_rv722s.jpg",
    alt: "Cotton Sarees",
    title: "Cotton Sarees",
    description:
      "Cotton Sarees are known for their lightweight texture and comfort, often featuring floral or geometric patterns that resonate with everyday elegance and simplicity.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1754911355/silkcotton_2_ih0emg.jpg",
    alt: "Silk Cotton Sarees",
    title: "Silk Cotton Sarees",
    description:
      "Silk Cotton Sarees combine the lustrous elegance of silk with the breezy comfort of cotton, offering graceful drapes and intricate designs perfect for both festive and casual occasions."
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540551/Linen_Sarees_izcsim.jpg",
    alt: "Linen Sarees",
    title: "Linen Sarees",
    description:
      "Breathable and elegant, Linen Sarees offer a minimal yet sophisticated look. Perfect for summer outings and casual events, they bring style with comfort and simplicity.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540551/Chanderi_Sarees_llpla2.jpg",
    alt: "Chanderi Sarees",
    title: "Chanderi Sarees",
    description:
      "Known for their glossy texture and lightweight feel, Chanderi Sarees are woven with silk and cotton. They reflect royalty, often adorned with zari and traditional patterns.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540551/Kalamkari_Dupata_ppmob9.jpg",
    alt: "Dupattas",
    title: "Dupattas",
    description:
      "Hand-painted and block-printed dupattas that tell stories through fabric art. Each design celebrates mythology and nature, blending craftsmanship with storytelling.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540552/Kalamkari_Sarees_ekxtxu.jpg",
    alt: "Kalamkari Sarees",
    title: "Kalamkari Sarees",
    description:
      "Kalamkari Sarees feature hand-painted or block-printed motifs inspired by mythology and nature. A canvas of tradition, they blend storytelling and style effortlessly.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1754907304/DIVERSE_COLLECTION_2_iwsjg9.jpg",
    alt: "Diverse Collections",
    title: "Diverse Collections",
    description:
      "Diverse Collection showcases intricate floral motifs and a beautifully detailed woven border, blending heritage-inspired patterns with refined craftsmanship. Its design reflects a perfect harmony of tradition and artistry.",
  },  
   
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1754910555/KHADI_2_1_q46ibo.jpg",
    alt: "Bengal Khadi Sarees",
    title: "Bengal Khadi Sarees",
    description:
      "Bengal Khadi Sarees are known for their fine handspun texture and lightweight comfort, featuring minimalistic patterns that embody elegance and everyday sophistication.",
  },
  {
    src: VairaaKaivannam,
    alt: "Vairaa Kaivannam (Customized Sarees)",
    title: "Vairaa Kaivannam (Customized Sarees)",
    description:
      "Discover the art of personalization with Vairaa Kaivannam’s customized sarees — where tradition meets individuality. Each saree is thoughtfully tailored and intricately designed to reflect your unique style, while preserving the elegance of Indian craftsmanship. Drape yourself in bespoke beauty rooted in cultural grace.",
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
  const [categories, setCategories] = useState([]);

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

  // Fetch categories from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/common/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      })
      .catch(() => setCategories([]));
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
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum + formatPriceWithTax(
          (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity
        ).priceWithTax,
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
        <span className="font-bold">₹{subtotal.toFixed(2)}</span>
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
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Our Collections
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated selection of traditional and contemporary pieces, 
              each telling a unique story of craftsmanship and elegance.
            </p>
          </div>

          {/* Collections Grid */}
          <div className="space-y-16">
            {aboutUsImageSections.map((section, idx) => {
              const isEven = idx % 2 === 0;
              // Replace spaces with plus for subcategory filter, do NOT add a plus at the end
              const subcategoryParam = section.title.replace(/\s+/g, '+');
              const handleCollectionClick = () => {
                navigate(`/shop/listing?category=${subcategoryParam}`);
              };
              
              return (
                <div
                  key={idx}
                  onClick={handleCollectionClick}
                  className={`group cursor-pointer flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Container */}
                  <div className="flex-1 w-full max-w-2xl">
                    <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10"></div>
                      {section.src === VairaaKaivannam ? (
                        <video
                          src={section.src}
                          controls
                          autoPlay
                          loop
                          muted
                          className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
                        />
                      ) : (
                        <img
                          src={section.src}
                          alt={section.alt}
                          className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold px-4 py-2 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore Collection
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6 text-center lg:text-left">
                    <div className="space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-wide group-hover:text-primary transition-colors duration-300">
                        {section.title}
                      </h3>
                      <div className="w-16 h-1 bg-primary rounded-full mx-auto lg:mx-0"></div>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {section.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary font-semibold text-lg group-hover:gap-3 transition-all duration-300">
                      <span>View Products</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
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