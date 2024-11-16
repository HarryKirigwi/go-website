import { Typography, TextField, Button, Grid, Box } from "@mui/material";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "../styles/Forms.css";
import "../App.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Zoom } from "react-awesome-reveal";

const formData = z.object({
  email: z.string().email(),
  name: z.string(),
  message: z.string(),
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      message: "",
    },
    resolver: zodResolver(formData),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Zoom>
      <div className="container" id="contact">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Box maxHeight={400} maxWidth={395} sx={{ p: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#EEEEEE" }}
              >
                Contact us
              </Typography>
              <Typography
                variant="body1"
                color="secondary"
                sx={{ marginBottom: 2 }}
              >
                Leave your message and we will get back to you in 24hrs
              </Typography>

              <div className="contact-items">
                <Grid container spacing={1}>
                  <Grid item xs={1}>
                    <div className="icon">
                      <AlternateEmailOutlinedIcon color="secondary" />
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2" color="secondary">
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      color="secondary"
                      sx={{ marginBottom: 2 }}
                    >
                      support@brilliantessay.com
                    </Typography>
                  </Grid>
                </Grid>

                <div className="contact-items">
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                      <div className="icon">
                        <PhoneIcon color="secondary" />
                      </div>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant="body2"
                        color="secondary"
                        gutterBottom
                      >
                        Phone
                      </Typography>
                      <Typography
                        variant="body1"
                        color="secondary"
                        sx={{ marginBottom: 2 }}
                      >
                        +254705483375
                      </Typography>
                    </Grid>
                  </Grid>
                </div>

                <div className="contact-items">
                  <Grid container spacing={1}>
                    <Grid item xs={1}>
                      <div className="icon">
                        <i class="fa fa-whatsapp" aria-hidden="true"></i>
                      </div>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography
                        variant="body2"
                        color="secondary"
                        gutterBottom
                      >
                        Whatsapp
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        +254705483375
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <div className="contact-form">
              <Box
                sx={{ p: 4, backgroundColor: "white", borderRadius: 2 }}
                maxHeight={410}
                maxWidth={395}
              >
                <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                  <Typography variant="body1" sx={{ color: "black" }}>
                    Email
                  </Typography>
                  <br />
                  <TextField
                    id="userEmail"
                    required
                    type="email"
                    placeholder="Enter your Email"
                    color="secondary"
                    size="small"
                    fullWidth
                    {...register("email")}
                    sx={{ marginTop: 0 }}
                  />
                  <br />

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

                  <Typography
                    variant="body1"
                    sx={{ color: "black", marginTop: 1 }}
                  >
                    Name
                  </Typography>
                  <br />

                  <TextField
                    id="userName"
                    placeholder="Enter your name"
                    color="secondary"
                    size="small"
                    sx={{ marginTop: 0 }}
                    fullWidth
                    {...register("name")}
                  />
                  <br />
                  <Typography
                    variant="body1"
                    sx={{ color: "black", marginTop: 1 }}
                  >
                    Your Message
                  </Typography>
                  <br />

                  <TextField
                    id="userMessage"
                    placeholder="Enter your message"
                    multiline
                    rows={3}
                    size="small"
                    color="secondary"
                    fullWidth
                    sx={{ marginBottom: 3, marginTop: 0 }}
                    {...register("message")}
                  />
                  <br />

                  <div className="submit-div">
                    <Button
                      variant="contained"
                      type="submit"
                      color="primary"
                      size="small"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </Zoom>
  );
}
