import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Grid } from "@mui/material";
import { Roll } from "react-awesome-reveal";

function createData(question, answer) {
  return { question, answer };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          <Typography variant="body1" color="secondary">
            {row.question}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                gutterBottom
                component="div"
                color="secondary"
              >
                {row.answer}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    "How do I place an order?",
    `To place an order, simply visit our website and fill out the order form.
    Provide all the necessary details, such as the
    topic, deadline, and any specific requirements. Once you submit the form,
    our team will review it and assign a writer to
    work on your essay.`
  ),

  createData(
    "What is the pricing?",
    ` Our pricing depends on the type of essay, academic level,
    and deadline. We offer competitive rates starting at $10 per
    page. You can find detailed pricing information on our website.`
  ),

  createData(
    "How long does it take to receive the completed essay?",
    `The turnaround time for your essay will depend on the length,
    complexity, and deadline you specify. Our writers strive
    to deliver high-quality essays within the agreed-upon timeframe.`
  ),

  createData(
    "Can I request revisions?",
    `
    Yes, we offer free revisions to ensure your satisfaction.
          If you have any feedback or require changes to your essay,
          simply contact our support team, and they will assist you in
          making the necessary revisions.`
  ),
];

export default function Faq() {
  return (
    <Box sx={{ marginBottom: 5 }} id="faq">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} lg={4}>
          <Roll duration={500}>
            <Typography
              variant="h4"
              color="primary"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography variant="h6" color="secondary" gutterBottom>
              {" "}
              Find answers to common questions about our company's background
              and operations.
            </Typography>
            <Button variant="contained">Contact Us</Button>
          </Roll>
        </Grid>

        <Grid item xs={12} sm={6} lg={8}>
          <Roll>
            <TableContainer component={Paper}>
              <Table aria-label="FAQ table" sx={{ backgroundColor: "#009be5" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" color="secondary">
                        Frequently Asked Questions
                      </Typography>
                    </TableCell>
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.question} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Roll>
        </Grid>
      </Grid>
    </Box>
  );
}
