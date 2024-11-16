import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TwitterIcon from "@mui/icons-material/X";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/material";
import { useState } from "react";

const logoStyle = {
  width: "140px",
  height: "auto",
};

const emailData = z.object({
  email: z.string().email(),
});

function Copyright() {
  return (
    <Typography variant="body2" color="secondary" mt={1}>
      {"Copyright © "}
      <Link href="#">Brilliant Essays&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const [open, setOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(emailData),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (emailData) => {
    console.log(emailData);
    reset();
  };

  return (
    <div style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          py: { xs: 4, sm: 5 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Box sx={{ ml: "-15px" }}></Box>
              <Typography
                variant="body2"
                fontWeight={600}
                gutterBottom
                color="primary"
              >
                Newsletter
              </Typography>
              <Typography variant="body2" color="secondary" mb={2}>
                Subscribe to our newsletter for weekly updates and promotions.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={1}>
                    <Grid item lg={10}>
                      <TextField
                        id="subEmail"
                        hiddenLabel
                        size="small"
                        variant="outlined"
                        fullWidth
                        aria-label="Enter your email address"
                        placeholder="Your email address"
                        inputProps={{
                          autoComplete: "off",
                          "aria-label": "Enter your email address",
                        }}
                        {...register("email")}
                        type="email"
                      />
                      {errors.email && (
                        <div style={{ color: "red", display: "flex" }}>
                          <div className="error-icon">
                            <ErrorOutlineIcon fontSize="inherit" />
                          </div>
                          <Typography variant="body2">
                            {errors.email.message}
                          </Typography>
                        </div>
                      )}
                    </Grid>
                    <Grid item lg={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ flexShrink: 0 }}
                        type="submit"
                      >
                        Subscribe
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600} color="primary">
              Product
            </Typography>
            <Link
              color="secondary"
              onClick={() => scrollToSection("services")}
              sx={{ cursor: "pointer" }}
            >
              Services
            </Link>
            <Link
              color="secondary"
              onClick={() => scrollToSection("contact")}
              sx={{ cursor: "pointer" }}
            >
              Contact
            </Link>
            <Link color="secondary" href="#">
              Blog
            </Link>
            <Link
              color="secondary"
              onClick={() => scrollToSection("faq")}
              sx={{ cursor: "pointer" }}
            >
              FAQs
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600} color="primary">
              Company
            </Typography>
            <Link color="secondary" href="#">
              About us
            </Link>
            <Link color="secondary" href="#">
              Careers
            </Link>
            <Link color="secondary" href="#">
              Press
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600} color="primary">
              Legal
            </Typography>
            <Link color="secondary" href="#">
              Terms
            </Link>
            <Link color="secondary" href="#">
              Privacy
            </Link>
            <Link
              color="secondary"
              onClick={() => scrollToSection("contact")}
              sx={{ cursor: "pointer" }}
            >
              Contact
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            pt: { xs: 4, sm: 8 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <div>
            <Link color="secondary" href="#">
              Privacy Policy
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="secondary" href="#">
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: "secondary",
            }}
          >
            <IconButton
              color="inherit"
              href="#"
              aria-label="FaceBook"
              sx={{ alignSelf: "center" }}
            >
              <FacebookRoundedIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="#"
              aria-label="X"
              sx={{ alignSelf: "center" }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="#"
              aria-label="LinkedIn"
              sx={{ alignSelf: "center" }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
