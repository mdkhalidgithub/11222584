import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Box } from "@mui/material";
import { logEvent } from "../../utils/logger";

export default function Redirector() {
  const { shortcode } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOriginalURL = async () => {
      try {
        logEvent("shortcode_visited", { shortcode });

        const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls")) || [];
        const match = storedUrls.find((item) => item.shortcode === shortcode);

        if (!match) {
          throw new Error("Shortcode not found.");
        }

        logEvent("redirect_success", {
          shortcode,
          originalUrl: match.longUrl,
        });

        setTimeout(() => {
          window.location.href = match.longUrl;
        }, 1000);

      } catch (err) {
        logEvent("redirect_error", { shortcode, message: err.message });
        setError(err.message);
      }
    };

    fetchOriginalURL();
  }, [shortcode]);

  if (error) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={8}>
      <CircularProgress />
      <Typography variant="h6" mt={2}>
        Redirecting to original URL...
      </Typography>
    </Box>
  );
}
