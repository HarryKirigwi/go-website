import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";

export default function SmallCards() {
  const cardStyles = {
    minWidth: 50,
    backgroundColor: "transparent",
    color: "white",
    border: "none",
    boxShadow: 0,
  };

  const [counterOn, setCounterOn] = useState(false);

  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(false)}
    >
      <Box sx={{ marginTop: 5 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {counterOn && (
                    <CountUp start={0} end={5} duration={2} delay={0}></CountUp>
                  )}
                  +
                </Typography>
                <Typography variant="body2" color="secondary">
                  Get you essay written by writers having over 5 yrs experience
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {counterOn && (
                    <CountUp
                      start={0}
                      end={1000}
                      duration={2}
                      delay={0}
                    ></CountUp>
                  )}
                  +
                </Typography>
                <Typography variant="body2" color="secondary">
                  Brilliant writers boast success in over 1000 projects
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  {counterOn && (
                    <CountUp
                      start={0}
                      end={99}
                      duration={2}
                      delay={0}
                    ></CountUp>
                  )}
                  %
                </Typography>
                <Typography variant="body2" color="secondary">
                  99% of our clients get satisfied with our services
                  <br />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ScrollTrigger>
  );
}
