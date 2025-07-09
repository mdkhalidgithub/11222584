import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { logEvent } from "../../utils/logger";

const initialURL = { longUrl: "", validity: "", shortcode: "" };

export default function URLShortenerForm() {
  const [urls, setUrls] = useState([initialURL]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, initialURL]);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const validateInputs = () => {
    const newErrors = urls.map((url) => {
      const error = {};
      if (!url.longUrl || !isValidUrl(url.longUrl)) {
        error.longUrl = "Enter a valid URL.";
      }
      if (url.validity && (!/^\d+$/.test(url.validity) || +url.validity <= 0)) {
        error.validity = "Enter a positive number.";
      }
      if (url.shortcode && !/^[a-zA-Z0-9]{3,10}$/.test(url.shortcode)) {
        error.shortcode =
          "Shortcode must be alphanumeric and 3-10 characters.";
      }
      return error;
    });

    setErrors(newErrors);
    return newErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      logEvent("validation_failed", { urls });
      return;
    }

    // Simulate logging
    logEvent("submit_urls", { urls });

    // Simulate API request
    alert("URLs submitted successfully!");
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, marginTop: 2 }}>
      <Typography variant="h5" gutterBottom>
        Shorten URLs
      </Typography>

      {urls.map((url, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Typography variant="subtitle1">URL #{index + 1}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Original Long URL"
                fullWidth
                value={url.longUrl}
                onChange={(e) =>
                  handleChange(index, "longUrl", e.target.value)
                }
                error={!!errors[index]?.longUrl}
                helperText={errors[index]?.longUrl}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Validity (minutes)"
                fullWidth
                value={url.validity}
                onChange={(e) =>
                  handleChange(index, "validity", e.target.value)
                }
                error={!!errors[index]?.validity}
                helperText={errors[index]?.validity}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Custom Shortcode (optional)"
                fullWidth
                value={url.shortcode}
                onChange={(e) =>
                  handleChange(index, "shortcode", e.target.value)
                }
                error={!!errors[index]?.shortcode}
                helperText={errors[index]?.shortcode}
              />
            </Grid>
          </Grid>
        </Box>
      ))}

      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          onClick={addUrlField}
          disabled={urls.length >= 5}
        >
          Add More
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit URLs
        </Button>
      </Box>
    </Paper>
  );
}
