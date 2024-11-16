import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DateTimePickers from "./DatePickers";
import "../styles/Forms.css";

// Constants for pricing and urgency
const PRICE_PER_PAGE = {
  "High School": 8.49,
  Undergraduate: 9.49,
  Graduate: 10.49,
  Postgraduate: 11.49,
  Professional: 11.49,
};
const URGENT_FEE = 3;
const URGENT_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Zod schema for price calculation form
const priceCalculationSchema = z.object({
  academicLevel: z.string().min(1),
  paperType: z.string().min(1),
  deadline: z.date(),
  numberOfPages: z
    .string()
    .transform(Number)
    .refine((n) => n > 0, { message: "Must be greater than 0" }),
  numberOfSources: z
    .string()
    .transform(Number)
    .refine((n) => n > 0, { message: "Must be greater than 0" }),
});

// Price Calculation Form Component
function PriceCalculationForm({ onSubmit, initialData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [orderSummary, setOrderSummary] = useState({
    costPerPage: 0,
    totalPages: 0,
    additionalCharges: 0,
    totalCost: 0,
    upfrontPayment: 0,
  });

  // Function to set default deadline to tomorrow at 11:00 PM
  const getDefaultDeadline = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 0, 0, 0);
    return tomorrow;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(priceCalculationSchema),
    defaultValues: initialData || {
      email: "",
      phoneNumber: "",
      academicLevel: "",
      paperType: "",
      deadline: getDefaultDeadline(),
      numberOfPages: 1,
    },
  });

  const watchAcademicLevel = watch("academicLevel");
  const watchNumberOfPages = watch("numberOfPages");
  const watchDeadline = watch("deadline");

  // Calculate order summary whenever relevant fields change
  useEffect(() => {
    const calculateOrderSummary = () => {
      const costPerPage = PRICE_PER_PAGE[watchAcademicLevel] || 0;
      const totalPages = parseInt(watchNumberOfPages) || 0;

      const now = new Date();
      const deadlineDate = new Date(watchDeadline);
      const timeUntilDeadline = deadlineDate.getTime() - now.getTime();
      const additionalCharges =
        timeUntilDeadline < URGENT_THRESHOLD ? URGENT_FEE * totalPages : 0;

      const totalCost = costPerPage * totalPages + additionalCharges;
      const upfrontPayment = totalCost / 2;

      setOrderSummary({
        costPerPage,
        totalPages,
        additionalCharges,
        totalCost,
        upfrontPayment,
      });
    };

    calculateOrderSummary();
  }, [watchAcademicLevel, watchNumberOfPages, watchDeadline]);

  const onSubmitWithSummary = (data) => {
    onSubmit({ ...data, orderSummary });
  };

  return (
    <div className="order-form-section">
      <div
        className="form-container"
        style={{ flexDirection: isMobile ? "column" : "row" }}
      >
        <form
          onSubmit={handleSubmit(onSubmitWithSummary)}
          className="order-form"
          style={{ flex: 1, maxWidth: isMobile ? "100%" : "400px" }}
        >
          <Controller
            name="academicLevel"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.academicLevel}
              >
                <InputLabel>Academic Level</InputLabel>
                <Select {...field} label="Academic Level">
                  <MenuItem value="High School">High School</MenuItem>
                  <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                  <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                  <MenuItem value="Professional">
                    Professional Education
                  </MenuItem>
                </Select>
                {errors.academicLevel && (
                  <Typography color="error" variant="caption">
                    {errors.academicLevel.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="paperType"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                size="small"
                margin="normal"
                error={!!errors.paperType}
              >
                <InputLabel>Paper Type</InputLabel>
                <Select {...field} label="Paper Type">
                  <MenuItem value="Argumentative">Argumentative essay</MenuItem>
                  <MenuItem value="Expository">Expository essay</MenuItem>
                  <MenuItem value={"Narrative"}>Narrative essay</MenuItem>
                  <MenuItem value={"Descriptive"}>Descriptive essay</MenuItem>
                  <MenuItem value={"Comparison"}>
                    Compare and contrast essay
                  </MenuItem>
                  <MenuItem value={"Cause/Effect"}>
                    Cause and effect essay
                  </MenuItem>
                  <MenuItem value={"Analytical"}>Analytical essay</MenuItem>
                  <MenuItem value={"Persuasive"}>Persuasive essay</MenuItem>
                  <MenuItem value={"Research"}>Research paper</MenuItem>
                  <MenuItem value={"Literature"}>Literature review</MenuItem>
                  <MenuItem value={"Critical"}>Critical analysis</MenuItem>
                  <MenuItem value={"Reflective"}>Reflective essay</MenuItem>
                  <MenuItem value={"Personal"}>Personal statement</MenuItem>
                  <MenuItem value={"Critique"}>Article Critique</MenuItem>
                  <MenuItem value={"Scholarship"}>Scholarship essay</MenuItem>
                </Select>
                {errors.paperType && (
                  <Typography color="error" variant="caption">
                    {errors.paperType.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Typography gutterBottom>Deadline:</Typography>
          <Controller
            name="deadline"
            control={control}
            render={({ field }) => (
              <DateTimePickers
                value={field.value}
                onChange={field.onChange}
                error={!!errors.deadline}
                helperText={errors.deadline?.message}
              />
            )}
          />

          <Controller
            name="numberOfPages"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Number of pages"
                error={!!errors.numberOfPages}
                helperText={errors.numberOfPages?.message}
                fullWidth
                size="small"
                margin="normal"
              />
            )}
          />

          <Controller
            name="numberOfSources"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Number of Sources"
                error={!!errors.numberOfPages}
                helperText={errors.numberOfPages?.message}
                fullWidth
                size="small"
                margin="normal"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            sx={{ mt: 2 }}
            fullWidth
          >
            Next
          </Button>
        </form>

        <div
          className="summary-section"
          style={{ flex: 1, marginTop: isMobile ? "20px" : 0 }}
        >
          <Box
            height={350}
            width={isMobile ? "100%" : 300}
            sx={{
              backgroundColor: "white",
              ml: isMobile ? 0 : 5,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography>Cost per page:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>${orderSummary.costPerPage.toFixed(2)}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Total pages:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{orderSummary.totalPages}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Additional Charges:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  ${orderSummary.additionalCharges.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Total Cost:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  ${orderSummary.totalCost.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1" color="primary">
                  Upfront Payment (50%):
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1" color="primary">
                  ${orderSummary.upfrontPayment.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
}

// Zod schema for paper details form
const paperDetailsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subject: z.string().min(1, "Subject is required"),
  citationStyle: z.string().min(1, "Citation style is required"),
  additionalInstructions: z.string().optional(),
  file: z
    .object({
      name: z.string().min(1, "File name is required"),
      type: z.string().min(1, "File type is required"),
      size: z.number().min(1, "File size is required"),
    })
    .optional(),
});

// Paper Details Form Component
function PaperDetailsForm({ onSubmit, initialData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paperDetailsSchema),
    defaultValues: initialData || {
      title: "",
      subject: "",
      citationStyle: "",
      additionalInstructions: "",
    },
  });

  return (
    <Box className="paper-details">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: isMobile ? "100%" : 450 }}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Course Title"
              error={!!errors.title}
              helperText={errors.title?.message}
              fullWidth
              margin="normal"
              size="small"
            />
          )}
        />
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Paper requirements"
              error={!!errors.subject}
              helperText={errors.subject?.message}
              fullWidth
              multiline
              rows={5}
              margin="normal"
              size="small"
            />
          )}
        />

        <Controller
          name="citationStyle"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              size="small"
              margin="normal"
              error={!!errors.citationStyle}
            >
              <InputLabel>Citation style</InputLabel>
              <Select {...field} label="Citation Style">
                <MenuItem value="APA">
                  APA (American Psychological Association)
                </MenuItem>
                <MenuItem value="MLA">
                  MLA (Modern Language Association)
                </MenuItem>
                <MenuItem value="Chicago">Chicago/Turabian</MenuItem>
                <MenuItem value="Harvard">Harvard</MenuItem>
                <MenuItem value="IEEE">
                  IEEE (Institute of Electrical and Electronics Engineers)
                </MenuItem>
              </Select>
              {errors.citationStyle && (
                <Typography color="error">
                  {errors.citationStyle?.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="additionalInstructions"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Additional Instructions"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              size="small"
            />
          )}
        />

        <Typography variant="caption">Attachments</Typography>

        <Controller
          name="file"
          control={control}
          render={({ field: { onChange, value, ...field } }) => (
            <TextField
              {...field}
              type="file"
              onChange={(e) => onChange(e.target.files[0])}
              error={!!errors.file}
              helperText={errors.file?.message || "Optional: Upload a file"}
              margin="normal"
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: 0, display: "block" }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          fullWidth
        >
          Next
        </Button>
      </form>
    </Box>
  );
}

// Review Form Component
function ReviewForm({ orderData, onSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      <Grid container spacing={2} direction={isMobile ? "column" : "row"}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Review Your Order</Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography>Academic Level:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.academicLevel}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Paper Type:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.paperType}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Number of Pages:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.numberOfPages}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Sources:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.numberOfSources}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Deadline:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.deadline.toLocaleString()}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Title:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.title}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Paper requirements:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.subject}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Citation Style:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.citationStyle}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Additional Instructions:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.additionalInstructions}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" sx={{ mt: isMobile ? 2 : 0 }}>
            Order Summary
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography>Cost per page:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                ${orderData.orderSummary.costPerPage.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Total pages:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{orderData.orderSummary.totalPages}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Additional Charges:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                ${orderData.orderSummary.additionalCharges.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Total Cost:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                ${orderData.orderSummary.totalCost.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Upfront Payment (50%):</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                ${orderData.orderSummary.upfrontPayment.toFixed(2)}
              </Typography>
            </Grid>
            <Box sx={{ textAlign: "end" }}>
              <Button
                onClick={onSubmit}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Place Order
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

// Main OrderSteps Component
function OrderSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const steps = ["Calculate Price", "Paper Details", "Review"];

  const handleNext = (data) => {
    setOrderData({ ...orderData, ...data });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setOrderData({});
  };

  const handleSubmit = () => {
    console.log("Final order data:", orderData);
    alert("Order placed successfully!");
    handleReset();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PriceCalculationForm onSubmit={handleNext} initialData={orderData} />
        );
      case 1:
        return (
          <PaperDetailsForm onSubmit={handleNext} initialData={orderData} />
        );
      case 2:
        return <ReviewForm orderData={orderData} onSubmit={handleSubmit} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Container>
      <Box
        className="order-section"
        sx={{
          width: "100%",
          backgroundColor: "rgb(255,255,255)",
          pt: 3,
          px: isMobile ? 1 : 3, // Add horizontal padding for mobile
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"} // Change orientation for mobile
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2, mb: 1 }}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Start New Order</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default OrderSteps;

// CSS styles
const styles = `
@media (max-width: 600px) {
  .container {
    height: fit-content;
    padding: 10px;
    margin-top: 2rem;
  }

  .form-container {
    flex-direction: column;
  }

  .order-form {
    max-width: 100%;
  }

  .summary-section {
    margin-top: 20px;
  }

  .paper-details form {
    max-width: 100%;
  }
}

`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
