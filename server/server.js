const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
const categoriesRouter = require("./routes/common/categories");
const subcategoriesRouter = require("./routes/common/subcategories");
const razorpayWebhookRouter = require("./routes/webhooks/razorpay");

// --- Security and stability middleware ---
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

// --- Async error handler utility ---
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Database connection is now securely configured using environment variables.

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

// --- Express app setup ---
const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet());
// Rate limiting
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 50 }));
// Prevent MongoDB operator injection
app.use(mongoSanitize());

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// --- Health check endpoint ---
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// --- API routes ---
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);

app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/common/categories", categoriesRouter);
app.use("/api/common/subcategories", subcategoriesRouter);
app.use("/api/webhooks", razorpayWebhookRouter);

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// --- Start server and handle process-level errors ---
const server = app.listen(PORT, () =>
  console.log(`Server is now running on port ${PORT}`)
);

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  server.close(() => process.exit(1));
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  server.close(() => process.exit(0));
});
