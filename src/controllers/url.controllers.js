import {Url} from "../models/url.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const generateShortUrl = asyncHandler(async (req, res) => {
  const { long_url } = req.body;
  const url = await Url.create({ long_url });
  const shortCode = url.short_code;
  const shortUrl = `${process.env.BASE_URL}/${shortCode}`;
  return res
    .status(200)
    .json(new ApiResponse(200, { shortUrl }, "Url shortened successfully"));
});


export const redirectToLongUrl = asyncHandler(async (req, res) => {
  const shortCode = req.params.shortCode
  
  const requestedUrlDocument = await Url.findOne({ short_code: shortCode})
  if (!requestedUrlDocument) {
    return res
      .status(404)
      .send("Url not found.")
  }

  
  if (
    requestedUrlDocument.expireAt &&
    new Date() > requestedUrlDocument.expireAt
  ) {
    return res.status(410).send("url expired.");
  }
  const longUrl = requestedUrlDocument.long_url
  return res
    .redirect(302, longUrl)

})