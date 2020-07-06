import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
// import { videos } from '../db';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    // console.log(videos);
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
    file: { path: fileUrl },
  } = req;

  //console.log(fileUrl);
  const newVideo = await Video.create({ fileUrl, title, description });
  res.redirect(routes.videoDetail(newVideo.id));
  //res.render("upload", { pageTitle: "Upload" });
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    const comments = await Comment.find({ video: id });
    res.render("videoDetail", { pageTitle: "Video Detail", video, comments });
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
    console.log(id, title, description);
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (e) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Video.findOneAndRemove({ _id: id });
    res.redirect(routes.home);
  } catch (error) {
    res.render(routes.editVideo(id));
  }
};
