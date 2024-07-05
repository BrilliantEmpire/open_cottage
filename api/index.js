require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./src/config/connect.db");
const express = require("express");
const cors = require("cors");
const {
  notFound,
  errorHandler,
} = require("./src/middlewares/errors.middleware");
const { authRoutes } = require("./src/routes/auth.routes");
const { recipeRoutes } = require("./src/routes/recipe.routes");
const { postRoutes } = require("./src/routes/post.routes");
const { uploadRoutes } = require("./src/routes/upload.route");
const { bookmarkRoutes } = require("./src/routes/bookmark.routes");
const { commentRoutes } = require("./src/routes/comment.routes");
const { madeRoutes } = require("./src/routes/mades.routes");
const { categoryRoutes } = require("./src/routes/category.routes");
const { notificationRoutes } = require("./src/routes/notification.routes");
const { followerRoutes } = require("./src/routes/follower.routes");
const { userRoutes } = require("./src/routes/user.routes");
const { adminRoutes } = require("./src/routes/admin.routes");
const { preferenceRoute } = require("./src/routes/preference.routes");

connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/recipe", recipeRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/bookmark", bookmarkRoutes);
app.use("/api/v1/comment", commentRoutes);
app.use("/api/v1/made", madeRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/follower", followerRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/preference", preferenceRoute);

app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Open-Cottage app backend</h1>");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on PORT : ${PORT}`));
