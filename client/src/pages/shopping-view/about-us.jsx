import React from "react";

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
  return (
    <section className="bg-gradient-to-b from-yellow-50 via-white to-yellow-100 py-14 px-4 md:px-0 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-center text-yellow-900 mb-4 tracking-tight drop-shadow-lg">
          About{" "}
          <span className="text-yellow-600">Pradhikshaa Ventures</span>
        </h1>
        {/* Subtitle */}
        <p className="text-xl text-center text-gray-700 mb-14 max-w-3xl mx-auto font-medium leading-relaxed bg-white/80 rounded-xl px-6 py-4 shadow">
          Pradhikshaa Ventures stands as one of Coimbatore’s premier boutiques,
          renowned for exceptional quality, distinctive designs, and a diverse
          collection curated for the modern connoisseur. Our unwavering commitment
          to customer satisfaction is reflected in outstanding service, a seamless
          shopping experience, and a hassle-free return policy.
        </p>
        {/* Alternating image/text sections */}
        {imageSections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } gap-10 mb-16 items-center`}
          >
            {/* Image */}
            <div className="flex-1 flex justify-center">
              <img
                src={section.src}
                alt={section.alt}
                className="rounded-2xl shadow-xl border-4 border-yellow-200 w-full max-w-md transition-transform hover:scale-105 duration-300"
              />
            </div>
            {/* Text */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-yellow-800 tracking-wide">
                {section.title}
              </h2>
              <p className="text-gray-700 text-lg">{section.description}</p>
            </div>
          </div>
        ))}
        {/* Why Choose Us */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-block w-12 h-1 bg-yellow-400 rounded-full mr-3"></span>
            <h2 className="text-3xl font-extrabold text-yellow-800 tracking-wide text-center drop-shadow">
              Why Choose Pradhikshaa Ventures?
            </h2>
            <span className="inline-block w-12 h-1 bg-yellow-400 rounded-full ml-3"></span>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/90 rounded-xl shadow p-6 flex items-start gap-4">
              <span className="text-yellow-500 text-3xl">🎨</span>
              <div>
                <h3 className="font-bold text-lg text-yellow-900 mb-1">
                  Curated Collections
                </h3>
                <p className="text-gray-700">
                  Handpicked sarees and accessories for every occasion.
                </p>
              </div>
            </div>
            <div className="bg-white/90 rounded-xl shadow p-6 flex items-start gap-4">
              <span className="text-yellow-500 text-3xl">🌟</span>
              <div>
                <h3 className="font-bold text-lg text-yellow-900 mb-1">
                  Unmatched Quality
                </h3>
                <p className="text-gray-700">
                  Premium fabrics and authentic craftsmanship.
                </p>
              </div>
            </div>
            <div className="bg-white/90 rounded-xl shadow p-6 flex items-start gap-4 md:col-span-2 mx-auto">
              <span className="text-yellow-500 text-3xl">💎</span>
              <div>
                <h3 className="font-bold text-lg text-yellow-900 mb-1">
                  Lifetime Boutique Experience
                </h3>
                <p className="text-gray-700">
                  We make every shopping experience memorable, building lasting
                  relationships.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Connect Section */}
        <div className="flex flex-col md:flex-row gap-10 items-center bg-white/80 rounded-2xl shadow-lg p-8">
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-2xl font-extrabold text-yellow-800 mb-4 tracking-wide">
              Connect With Us
            </h2>
            <div className="space-y-2 text-lg">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 text-xl">📘</span>
                <span>
                  <b>Facebook:</b>{" "}
                  <a
                    href="https://facebook.com/pradhikshaasilks"
                    className="text-blue-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pradhikshaa Silks
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">📸</span>
                <span>
                  <b>Instagram:</b>{" "}
                  <a
                    href="https://instagram.com/pradhikshaasilks"
                    className="text-pink-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @pradhikshaasilks
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-700 text-xl">🌐</span>
                <span>
                  <b>Website:</b>{" "}
                  <a
                    href="https://www.pradhikshaasilks.com"
                    className="text-green-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pradhikshaasilks.com
                  </a>{" "}
                  |{" "}
                  <a
                    href="https://www.pradhikshaaventures.com"
                    className="text-green-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pradhikshaaventures.com
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 text-xl">💬</span>
                <span>
                  <b>WhatsApp:</b>{" "}
                  <a
                    href="https://wa.me/9994819203"
                    className="text-green-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    9994819203
                  </a>
                </span>
              </div>
            </div>
            <p className="mt-6 text-gray-700 italic text-center md:text-left">
              Discover the elegance of tradition and the allure of modern design at
              <span className="text-yellow-700 font-semibold"> Pradhikshaa Ventures</span>—your destination for timeless style and exceptional boutique experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;