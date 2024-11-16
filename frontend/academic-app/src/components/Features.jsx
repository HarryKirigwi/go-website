import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Grid,
  Card,
  Typography,
  CardContent,
} from "@mui/material/";
import "../styles/Features.css";
import "../App.css";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { Fade } from "react-awesome-reveal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

export default function FeaturesGrid() {
  const cardStyles = {
    minWidth: 275,
    minHeight: 220,
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(24px)",
    borderRadius: 2,
  };

  return (
    <section className="snap-section">
      <div className="feature-messages">
        <Box sx={{ flexGrow: 1, marginTop: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <Fade duration={500}>
                <Card sx={cardStyles} className="card-styles">
                  <CardContent>
                    <AssignmentTurnedInOutlinedIcon
                      fontSize="medium"
                      sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h5" color="primary" gutterBottom>
                      Plagiarism free work
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Receive 100% original papers crafted from scratch. Our
                      stringent plagiarism checks ensure your work is unique and
                      authentic.
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Fade duration={1000}>
                <Card sx={cardStyles}>
                  <CardContent>
                    <LibraryBooksOutlinedIcon
                      fontSize="medium"
                      sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h5" color="primary" gutterBottom>
                      Experienced writers
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Work with seasoned academic experts who understand your
                      field. Our writers hold advanced degrees and have years of
                      experience in academic writing.
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Fade duration={1500}>
                <Card sx={cardStyles}>
                  <CardContent>
                    <SupportAgentOutlinedIcon
                      fontSize="medium"
                      sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h5" color="primary" gutterBottom>
                      24/7 Support
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Get help whenever you need it. Our dedicated support team
                      is available around the clock to assist you with any
                      questions or concerns.
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Fade duration={2000}>
                <Card sx={cardStyles}>
                  <CardContent>
                    <FactCheckOutlinedIcon
                      fontSize="medium"
                      sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h5" color="primary" gutterBottom>
                      Original Content
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Benefit from custom-written content tailored to your
                      specific requirements. Every paper is created to meet your
                      unique needs and standards.
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Fade duration={2500}>
                <Card sx={cardStyles}>
                  <CardContent>
                    <AccessTimeOutlinedIcon
                      fontSize="medium"
                      sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h5" color="primary" gutterBottom>
                      Timely delivery
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Deadlines looming? Rest easy. Our efficient process
                      guarantees punctual delivery without compromising on
                      quality, giving you ample time for review and revisions.
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Fade duration={3000}>
                <Card sx={cardStyles}>
                  <CardContent>
                    <AccountBalanceWalletOutlinedIcon
                      fontSize="medium"
                      sx={{ marginBottom: 2 }}
                    />
                    <Typography variant="h5" color="primary" gutterBottom>
                      Affordability
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Quality academic support doesn't have to break the bank.
                      Our services start at just $10 per page, offering you
                      premium writing assistance at student-friendly prices.
                      <br />
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Box>
      </div>
    </section>
  );
}
