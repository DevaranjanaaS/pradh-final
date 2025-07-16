import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import instaLogo from "@/assets/insta-logo.png";
import whatsappLogo from "@/assets/whatsapp-logo.png";

const imageSections = [
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540547/Painting_vtks5n.jpg",
    alt: "Traditional Paintings",
    title: "Traditional Paintings",
    description:
      "Our collection of traditional paintings showcases rich Indian art forms including Madhubani, Tanjore, and Pattachitra. These pieces celebrate heritage through vibrant colors and detailed brushwork.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540547/Soft_silk_sarees_bwtpu7.jpg",
    alt: "Soft Silk Sarees",
    title: "Soft Silk Sarees",
    description:
      "Our soft silk sarees combine elegance and comfort, perfect for both everyday wear and special occasions. With vibrant colors and rich textures, they reflect timeless tradition with a modern twist.",
  },
  {
    src: "https://res.cloudinary.com/ddvxciphm/image/upload/v1749540547/TERRACOTA_JEWELARY_k7tzib.jpg",
    alt: "Terracotta Jewelry",
    title: "Terracotta Jewelry",
    description:
      "Explore handcrafted terracotta jewelry that adds a touch of earthy sophistication to any outfit. Each piece is carefully molded and painted, offering a rustic charm rooted in Indian heritage.",
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
];

function AboutUs() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#policies") {
      const el = document.getElementById("policies");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-50 min-h-screen mt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-900 mb-8">
              Pradhikshaa Ventures
            </h1>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-8">
              Coimbatore's premier boutique destination, renowned for exceptional quality, 
              distinctive designs, and curated collections for the modern connoisseur.
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-yellow-200">
              <p className="text-lg text-gray-600 leading-relaxed">
                Our unwavering commitment to customer satisfaction is reflected in outstanding service, 
                a seamless shopping experience, and a comprehensive return policy that puts your needs first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-6">
              Our Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated selection of traditional and contemporary pieces, 
              each telling a unique story of craftsmanship and elegance.
            </p>
          </div>

          <div className="space-y-20">
            {imageSections.map((section, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                {/* Image Container */}
                <div className="flex-1 w-full max-w-lg">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <img
                      src={section.src}
                      alt={section.alt}
                      className="relative w-full h-80 object-cover rounded-2xl shadow-2xl border-2 border-yellow-200 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-yellow-800 tracking-wide">
                      {section.title}
                    </h3>
                    <div className="w-20 h-1 bg-yellow-400 rounded-full"></div>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-900 mb-6">
              Why Choose Pradhikshaa Ventures?
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference that passion, quality, and dedication make in every interaction.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-yellow-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">🎨</span>
                </div>
                <h3 className="text-2xl font-bold text-yellow-900 mb-3">
                  Curated Collections
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Handpicked sarees and accessories for every occasion, ensuring you find the perfect piece for your special moments.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-yellow-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">🌟</span>
                </div>
                <h3 className="text-2xl font-bold text-yellow-900 mb-3">
                  Unmatched Quality
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Premium fabrics and authentic craftsmanship that stand the test of time, ensuring lasting beauty and comfort.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-yellow-100">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl">💎</span>
                </div>
                <h3 className="text-2xl font-bold text-yellow-900 mb-3">
                  Lifetime Experience
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We create memorable shopping experiences and build lasting relationships with every customer who walks through our doors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section id="policies" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-8 text-white text-center">
              <h2 className="text-4xl font-bold mb-4">
                Return, Cancellation & Exchange Policy
              </h2>
              <p className="text-xl opacity-90">
                Pradhikshaa Silks - Transparent, Fair, and Customer-Focused
              </p>
            </div>

            <div className="p-10">
              <div className="prose prose-lg max-w-none">
                <div className="grid gap-8">
                  
                  {/* Return Policy */}
                  <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
                    <h3 className="text-2xl font-bold text-yellow-900 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</span>
                      Return Policy
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold text-yellow-800 mb-3">Domestic Orders (Within India)</h4>
                        <div className="bg-white rounded-xl p-6 border border-yellow-200">
                          <p className="text-gray-700 mb-4">
                            <strong>Eligibility:</strong> Returns are accepted only if notified within 24 hours of delivery for:
                          </p>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                              <span className="text-gray-700">Damaged or defective items</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                              <span className="text-gray-700">Incorrect item delivered</span>
                            </div>
                          </div>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700 font-semibold">
                              Important: Sale/Deal items are not eligible for return or exchange.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-yellow-800 mb-3">Return Process</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-xl p-6 border border-yellow-200">
                            <div className="flex items-center mb-3">
                              <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</span>
                              <strong className="text-gray-800">Notify Within 24 Hours</strong>
                            </div>
                            <p className="text-gray-600 text-sm">Contact via email or WhatsApp with order details and reason</p>
                          </div>
                          <div className="bg-white rounded-xl p-6 border border-yellow-200">
                            <div className="flex items-center mb-3">
                              <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</span>
                              <strong className="text-gray-800">Provide Proof</strong>
                            </div>
                            <p className="text-gray-600 text-sm">Unedited unboxing video showing product, tags, and packaging</p>
                          </div>
                          <div className="bg-white rounded-xl p-6 border border-yellow-200">
                            <div className="flex items-center mb-3">
                              <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</span>
                              <strong className="text-gray-800">Await Approval</strong>
                            </div>
                            <p className="text-gray-600 text-sm">Our team will review and approve your return request</p>
                          </div>
                          <div className="bg-white rounded-xl p-6 border border-yellow-200">
                            <div className="flex items-center mb-3">
                              <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">4</span>
                              <strong className="text-gray-800">Ship Within 3 Days</strong>
                            </div>
                            <p className="text-gray-600 text-sm">Pack securely and ship to provided address</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exchange Policy */}
                  <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                    <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</span>
                      Exchange Policy
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-xl p-6 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Eligibility</h4>
                        <p className="text-gray-600 text-sm">Only for defective/damaged items within 24 hours</p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Requirements</h4>
                        <p className="text-gray-600 text-sm">Unboxing video, original tags, unused condition</p>
                      </div>
                      <div className="bg-white rounded-xl p-6 border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Process</h4>
                        <p className="text-gray-600 text-sm">Same as return procedure, customer pays shipping</p>
                      </div>
                    </div>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200">
                    <h3 className="text-2xl font-bold text-orange-900 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</span>
                      Cancellation Policy
                    </h3>
                    <div className="bg-white rounded-xl p-6 border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 mb-2">
                            <strong>Before Shipping:</strong> Full cancellation allowed
                          </p>
                          <p className="text-gray-700">
                            <strong>After Shipping:</strong> Cancellation not permitted
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Contact immediately:</p>
                          <a href="https://wa.me/+919994819203" className="text-orange-600 font-semibold">
                            +91 99948 19203
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quality Standards */}
                  <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
                    <h3 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">4</span>
                      Quality Check Criteria
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          <span className="text-gray-700">No signs of use, wash, or alteration</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          <span className="text-gray-700">All original tags intact</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          <span className="text-gray-700">Original folding and packaging</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          <span className="text-gray-700">Free from stains, odors, or damage</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Notes</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Refund Options</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• Product exchange</p>
                          <p>• Gift card equivalent</p>
                          <p>• Full refund (if out of stock)</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">International Orders</h4>
                        <p className="text-sm text-gray-600">
                          Returns and exchanges not accepted for orders shipped outside India.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12">
                <h2 className="text-4xl font-bold text-yellow-900 mb-8">
                  Connect With Us
                </h2>
                <div className="space-y-6">
                  

                  <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl border border-pink-200">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                      <img src={instaLogo} alt="Instagram" className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Instagram</p>
                      <a
                        href="https://instagram.com/pradhikshaasilks"
                        className="text-pink-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @pradhikshaasilks
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5 object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">WhatsApp</p>
                      <a
                        href="https://wa.me/+919994819203"
                        className="text-green-600 hover:underline text-lg font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +91 99948 19203
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-12 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">💎</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Experience Excellence
                  </h3>
                  <p className="text-lg leading-relaxed opacity-90">
                    Discover the elegance of tradition and the allure of modern design at 
                    Pradhikshaa Ventures—your destination for timeless style and exceptional 
                    boutique experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;