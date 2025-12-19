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
