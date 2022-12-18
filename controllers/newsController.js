const News = require("../models/newsModel");
const User = require("../models/userModel");

// DESC     get only my news
// METHOD   GET http://localhost:5000/api/news
// ACCESS   private
const getMyNews = async (req, res) => {
  try {
    const news = await News.find({ user: req.user.id });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DESC     create news
// METHOD   POST http://localhost:5000/api/news/create
// ACCESS   private
const createNews = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400).json({ message: "A value is missing" });
    return;
  }

  try {
    const news = await News.create({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      email: req.body.email,
      name: req.body.name,
      user: req.user.id,
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DESC     delete my report
// METHOD   DELETE http://localhost:5001/api/news/delete/:id
// ACCESS   private
const deleteNews = async (req, res) => {
  const news = await News.findById(req.params.id);

  if (!news) {
    res.status(400).json({ message: "News not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (news.user.toString() !== user.id) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete news" });
  }
};

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Admin Routes>>>>>>>>>>>>>>>>>>>>

// DESC     get all news
// METHOD   GET http://localhost:5000/api/news/admin
// ACCESS   public
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).send(error);
  }
};

// DESC     update status
// METHOD   PUT http://localhost:5001/api/news/admin/update/:id
// ACCESS   public
const updateNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  // console.log(req.body);

  if (!news) {
    res.status(400).json({ message: "News not found" });
    return;
  }

  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: "Could not update news" });
  }
};

module.exports = {
  getMyNews,
  createNews,
  deleteNews,
  getAllNews,
  updateNews,
};
