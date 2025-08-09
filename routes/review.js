const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");


const reviewControllers = require("../controllers/review.js");

//Reviews 
//post route
router.post("/",
    isLoggedIn,
    validateReview,
     wrapAsync(reviewControllers.createReview)
);

//delete review 
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewControllers.destroyReview));

module.exports = router;