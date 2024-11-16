import "../styles/Testimonial.css";
import "../App.css";
import { Typography, Grid, Paper, Rating } from "@mui/material";
import { Zoom } from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";

export default function Testimonial() {
  const paperStyles = {
    minHeight: 180,
    padding: 2,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  };

  const whiteColor = {
    color: "#EEEEEE",
  };

  return (
    <Zoom duration={500}>
      <div className="testimonial-section">
        <div className="text-section">
          <Typography
            color="primary"
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Our Clients have rated us 5 stars
          </Typography>
          <Typography
            variant="h6"
            sx={{ maxWidth: "900px", width: "100%" }}
            color="secondary"
            gutterBottom
          >
            When it comes to academic success, our clients speak volumes. We're
            proud to have earned a perfect 5-star rating from students and
            researchers who've experienced the difference our expert writing
            services make.
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{ marginTop: 5, fontWeight: 500 }}
            gutterBottom
          >
            Here is what they had to say:
          </Typography>
        </div>

        <div className="card-section">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <Fade>
                <Paper elevation={4} sx={paperStyles}>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                  >
                    Brilliant Essay saved my academic career! Their expert
                    writers crafted a dissertation proposal that impressed my
                    advisor. The depth and quality of their work is outstanding.
                  </Typography>
                  <div className="testimonial-profile">
                    <div className="image-div"></div>
                    <div className="name">
                      <Typography variant="body1" sx={whiteColor}>
                        Elena K.
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(174, 176, 180)" }}
                      >
                        Ph.D. Candidate
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Fade duration={1500}>
                <Paper elevation={4} sx={paperStyles}>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    color="secondary"
                  >
                    Brilliant Essay saved my academic career! Their expert
                    writers crafted a dissertation proposal that impressed my
                    advisor. The depth and quality of their work is outstanding.
                  </Typography>
                  <div className="testimonial-profile">
                    <div className="image-div"></div>
                    <div className="name">
                      <Typography variant="body1" sx={whiteColor}>
                        Elena K.
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(174, 176, 180)" }}
                      >
                        Ph.D. Candidate
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Fade duration={2000}>
                <Paper
                  elevation={4}
                  sx={{
                    backgroundColor: "#009be5",
                    minHeight: 180,
                    padding: 2,
                    color: "rgb(238, 238, 239)",
                  }}
                >
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    color="secondary"
                  >
                    Skeptical at first, but Brilliant Essay delivered beyond
                    expectations. Got an A on my engineering paper and praise
                    from my professor. They're my go-to for academic success!
                  </Typography>
                  <div className="testimonial-profile">
                    <div className="image-div"></div>
                    <div className="name">
                      <Typography variant="body1" sx={whiteColor}>
                        James L.{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(174, 176, 180)" }}
                      >
                        Engineering Student
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Fade duration={2500}>
                <Paper elevation={4} sx={paperStyles}>
                  <Rating name="read-only" value={5} readOnly size="small" />
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 2, marginBottom: 2 }}
                    color="secondary"
                  >
                    As a non-native speaker, Brilliant Essay improved both my
                    grades and writing skills. Their feedback is invaluable.
                    Highly recommend to any student aiming for excellence!
                  </Typography>
                  <div className="testimonial-profile">
                    <div className="image-div"></div>
                    <div className="name">
                      <Typography variant="body1" sx={whiteColor}>
                        Sarah M.{" "}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "rgb(174, 176, 180)" }}
                      >
                        Master's Student
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </div>
      </div>
    </Zoom>
  );
}
