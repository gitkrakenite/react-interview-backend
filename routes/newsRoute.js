const express = require("express");
const router = express.Router();

const {
  getMyNews,
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
} = require("../controllers/newsController");
const { protect } = require("../middlewares/authMiddleware");

// news reporter
router.post("/create", protect, createNews);
router.delete("/delete/:id", protect, deleteNews);
router.get("/", protect, getMyNews);

// admin
router.put("/admin/update/:id", updateNews);
router.get("/admin", getAllNews);

module.exports = router;
