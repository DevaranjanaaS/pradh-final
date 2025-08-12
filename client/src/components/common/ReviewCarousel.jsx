import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import StarRating from "@/components/common/star-rating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Quote, Star, User, ExternalLink, QrCode, MessageCircle, ArrowRight } from "lucide-react";
import googleReviewQr from "../../assets/google-review-qr.jpeg";

// Configuration
const GOOGLE_REVIEW_LINK = "https://g.page/r/CXDrLf_SMBD1EAI/review";

// Helper: Fetch reviews from backend (replace with your actual API call)
async function fetchReviews() {
  const res = await fetch("/api/shop/review/all");
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

// Helper: Post a new review (replace with your actual API call)
async function postReview({ userId, userName, reviewMessage, reviewValue }) {
  const res = await fetch("/api/shop/review/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, userName, reviewMessage, reviewValue }),
    credentials: "include", // send cookies if needed
  });
  return res.json();
}

export default function ReviewCarousel() {
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showGoogleQR, setShowGoogleQR] = useState(false);
  const swiperRef = useRef(null);
  
  // Form state
  const [form, setForm] = useState({ rating: 0, text: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews on mount
  useEffect(() => {
    setLoading(true);
    fetchReviews()
      .then((data) => {
        setReviews(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load reviews");
        setLoading(false);
      });
  }, []);

  // Handle form input
  function handleFormChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
  }

  // Validate and submit review
  async function handleSubmit(e) {
    e.preventDefault();
    if (form.rating < 1 || form.rating > 5) {
      setFormError("Please select a star rating.");
      return;
    }
    if (!form.text.trim()) {
      setFormError("Please share your experience.");
      return;
    }
    if (form.text.length > 500) {
      setFormError("Review text must be under 500 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const result = await postReview({
        userId: user?.id,
        userName: user?.name || "Anonymous",
        reviewMessage: form.text,
        reviewValue: form.rating,
      });
      if (result.success) {
        setShowModal(false);
        setForm({ rating: 0, text: "" });
        setFormError("");
        // Refetch reviews
        fetchReviews().then((data) => setReviews(data.data || []));
        toast({ title: "Thank you for your review!" });
      } else {
        setFormError(result.message || "Failed to submit review.");
      }
    } catch (err) {
      setFormError("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  // Handle Google Review redirect
  const handleGoogleReview = () => {
    window.open(GOOGLE_REVIEW_LINK, "_blank", "noopener,noreferrer");
  };

  // Render star rating display
  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 border-t">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user && (
              <Button 
                className="bg-primary hover:bg-primary/90 px-6 py-2"
                onClick={() => setShowModal(true)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Share Your Experience
              </Button>
            )}
            
            {/* Google Review Section */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Button 
                variant="outline" 
                className="border-[#C2882B] text-[#A06A17] hover:bg-amber-50 px-6 py-2"
                onClick={handleGoogleReview}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Review us on Google
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#C2882B] hover:text-[#A06A17] hover:bg-amber-50"
                onClick={() => setShowGoogleQR(true)}
              >
                <QrCode className="w-4 h-4 mr-1" />
                QR Code
              </Button>
            </div>
          </div>
        </div>

        {/* Google Review CTA Banner */}
        <div className="bg-gradient-to-r from-[#C2882B] to-[#A06A17] rounded-2xl p-6 mb-12 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Love our service?</h3>
              <p className="text-amber-100 mb-4">Help others discover us by leaving a Google review!</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button 
                  variant="secondary"
                  className="bg-white text-[#A06A17] hover:bg-amber-50"
                  onClick={handleGoogleReview}
                >
                  <Star className="w-4 h-4 mr-2 fill-current" />
                  Leave Google Review
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="ghost"
                  className="text-white border-white hover:bg-[#A06A17]"
                  onClick={() => setShowGoogleQR(true)}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Scan QR Code
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
                <Star className="w-12 h-12 text-yellow-300 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-gray-500 mt-4">Loading reviews...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && reviews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              No reviews yet. Be the first to share your experience!
            </div>
            <Button 
              className="bg-[#C2882B] hover:bg-[#A06A17] text-white"
              onClick={handleGoogleReview}
            >
              <Star className="w-4 h-4 mr-2" />
              Leave Google Review
            </Button>
          </div>
        )}

        {/* Reviews Carousel */}
        {!loading && !error && reviews.length > 0 && (
          <div className="relative">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {reviews.map((review, idx) => (
                <SwiperSlide key={review._id || idx}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 group">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start mb-4">
                      <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                      <div className="flex items-center space-x-2">
                        {renderStars(review.reviewValue)}
                        <span className="text-sm font-medium text-gray-600">
                          {review.reviewValue}/5
                        </span>
                      </div>
                    </div>

                    {/* Review Message */}
                    <div className="mb-6 flex-1">
                      <p className="text-gray-700 text-base leading-relaxed line-clamp-4">
                        "{review.reviewMessage}"
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {review.userName || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500">Verified Customer</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Modal for adding review */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Share Your Experience</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  How would you rate your experience? <span className="text-red-500">*</span>
                </label>
                <StarRating
                  rating={form.rating}
                  handleRatingChange={(val) => handleFormChange("rating", val)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Tell us about your experience <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={form.text}
                  onChange={(e) => handleFormChange("text", e.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="What did you love about your experience? Any suggestions for improvement?"
                  className="resize-none"
                  required
                />
                <div className="text-xs text-gray-400 text-right mt-1">
                  {form.text.length}/500 characters
                </div>
              </div>
              {formError && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {formError}
                </div>
              )}
              
              {/* Suggestion for Google Review */}
              <div className="bg-amber-50 border border-[#C2882B] rounded-lg p-4">
                <p className="text-sm text-[#A06A17] mb-2">
                  <strong>💡 Pro tip:</strong> Consider leaving a Google review too!
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#C2882B] text-[#A06A17] hover:bg-amber-100"
                  onClick={handleGoogleReview}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Google Review
                </Button>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Google QR Code Modal */}
        <Dialog open={showGoogleQR} onOpenChange={setShowGoogleQR}>
          <DialogContent className="max-w-sm w-full">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Scan to Review on Google
              </DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <img
                  src={googleReviewQr}
                  alt="Google Review QR Code"
                  className="w-48 h-48 mx-auto rounded-lg shadow-sm"
                />
              </div>
              <p className="text-sm text-gray-600">
                Scan this QR code with your phone camera to leave us a Google review
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleGoogleReview}
                  className="bg-[#C2882B] hover:bg-[#A06A17] text-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Google Reviews
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowGoogleQR(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}