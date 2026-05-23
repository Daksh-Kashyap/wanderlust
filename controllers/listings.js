const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

const defaultGeometry = () => ({
  type: "Point",
  coordinates: [0, 0],
});

const geocodeLocation = async (location) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "wanderlust-app/1.0",
        },
      }
    );

    if (!response.ok) {
      throw new ExpressError(502, "Could not geocode this location right now");
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new ExpressError(400, "Could not find coordinates for this location");
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    return {
      type: "Point",
      coordinates: [lon, lat],
    };
  } finally {
    clearTimeout(timeout);
  }
};

const getListingGeometry = async (location) => {
  try {
    return await geocodeLocation(location);
  } catch (err) {
    console.error(`Geocoding failed for "${location}": ${err.message}`);
    return defaultGeometry();
  }
};


module.exports.index = async (req, res) => {
  const allListings = await Listing.find({}).sort({ _id: -1 });
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.createListings = async (req, res) => {
<<<<<<< HEAD
  // Geocoding using OpenStreetMap (Nominatim)
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(req.body.listing.location)}`, {
    headers: {
      "User-Agent": "wanderlust-app"
    }
  });

  const data = await response.json();
  const lat = parseFloat(data[0].lat);
  const lon = parseFloat(data[0].lon);

  console.log(lat, lon); // optional for debug

  // Setup image
=======
  // Setup image
  if (!req.file) {
    throw new ExpressError(400, "Listing image is required");
  }

  // Geocoding should not block saving the listing in production.
  const geometry = await getListingGeometry(req.body.listing.location);

>>>>>>> 1396a3e (Fix listing creation on deploy)
  let url = req.file.path;
  let filename = req.file.filename;

  // Create listing
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // Save geometry like Mapbox
  newListing.geometry = {
    type: "Point",
    coordinates: [lon, lat]
  };

  await newListing.save();
  req.flash("success", "New Lisiting Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing you requested for edit does not exist!");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250,h_250,c_fill"
  );
  res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

<<<<<<< HEAD
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
=======
  let listing = await Listing.findById(id);
  const locationChanged = req.body.listing.location !== listing.location;

  Object.assign(listing, req.body.listing);

  if (locationChanged) {
    listing.geometry = await getListingGeometry(req.body.listing.location);
  }

>>>>>>> 1396a3e (Fix listing creation on deploy)
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", " Lisiting Deleted !");
  res.redirect("/listings");
};
