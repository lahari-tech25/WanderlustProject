const Listing = require("../models/listing");
const geocodeLocation = require('../utils/geocode');


module.exports.index = async (req,res,next)=>{
   const allListings = await Listing.find({});
   res.render("./listings/index.ejs",{allListings});
}

module.exports.renderNewForm = (req,res)=>{
 res.render("./listings/new.ejs");
}

module.exports.showListings = async (req,res,next)=>{
   let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
       return res.redirect("/listings");
    }
    console.log(listing);
    // res.render("./listings/show.ejs",{listing});

    res.render("listings/show", {
        listing,
        currUser: req.user,
        mapToken: process.env.MAP_TOKEN // ✅ pass the token here
    });
}

module.exports.createListing = async (req,res,next)=>{
const coordinates = await geocodeLocation(req.body.listing.location);
console.log("Coordinates:", coordinates);


    let url = req.file.path;
    let filename = req.file.filename;
    
    const newListing =new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
     newListing.geometry = {
  type: 'Point',
  coordinates: coordinates  // directly assign the array
};
    await newListing.save();
    console.log("Saved listing with coordinates:", newListing.geometry);

    req.flash("success","New Listing is Added");
    res.redirect("/listings");
}

module.exports.editListing = async (req,res,next)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl= listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing = async(req,res,next)=>{
    let {id} = req.params;
     let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
     console.log("Uploaded File:", req.file);
     if( typeof req.file !== "undefined")
    {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename};
      await listing.save();
     }
    req.flash("success"," Listing is Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req,res,next)=>{
    let {id} = req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing is Deleted");
    res.redirect("/listings");
}