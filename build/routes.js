"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable no-else-return */
// Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search"; // Users

var USERS = "/users";
var USER_DETAIL = "/:id";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var ME = "/me"; // Videos

var VIDEOS = "/videos";
var UPLOAD = "/upload";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit";
var DELETE_VIDEO = "/:id/delete"; // GitHub

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; // Facebook

var FACEBOOK = "/auth/facebook";
var FACEBOOK_CALLBACK = "/auth/facebook/callback"; // API

var API = "/api";
var REGISTER_VIEW = "/:id/view";
var ADD_COMMENT = "/:id/comment";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  facebook: FACEBOOK,
  facebookCallback: FACEBOOK_CALLBACK,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: function userDetail(id) {
    if (id) {
      return "".concat(USERS, "/").concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  me: ME,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "".concat(VIDEOS, "/").concat(id);
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "".concat(VIDEOS, "/").concat(id, "/edit");
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "".concat(VIDEOS, "/").concat(id, "/delete");
    } else {
      return DELETE_VIDEO;
    }
  },
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT
};
var _default = routes;
exports["default"] = _default;