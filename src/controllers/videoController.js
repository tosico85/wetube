import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
// import { videos } from '../db';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (e) {
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy } });
  } catch (e) {
    console.log(e);
  }

  res.render("Search", { pageTitle: "Search", searchingBy, videos });
};
// export const videos = (req, res) => res.render("videos", { pageTitle: "Videos" });
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location: fileUrl },
  } = req;

  //console.log(fileUrl);
  const newVideo = await Video.create({
    fileUrl,
    title,
    description,
    creator: req.user.id,
  });

  req.user.videos.push(newVideo.id);
  req.user.save();

  res.redirect(routes.videoDetail(newVideo.id));
  //res.render("upload", { pageTitle: "Upload" });
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    console.log(video);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (e) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error;
    }
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (e) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    //console.log(id, title, description);
    //await Video.findOneAndUpdate({ _id: id }, { title, description });
    const video = await Video.findOne({ _id: id });
    console.log(video.creator, req.user.id);
    if (String(video.creator) !== req.user.id) {
      console.log("exit");
      res.redirect(routes.videoDetail(id));
    } else {
      console.log("update");
      await video.updateOne({ title, description });
      res.redirect(routes.videoDetail(id));
    }
  } catch (e) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findOne({ _id: id });
    if (String(video.creator) !== req.user.id) {
      throw Error();
    }
    video.remove();
    res.redirect(routes.home);
  } catch (error) {
    res.render(routes.editVideo(id));
  }
};

// Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    req.user.comments.push(newComment.id);
    video.comments.push(newComment.id);
    video.save();
    req.user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
