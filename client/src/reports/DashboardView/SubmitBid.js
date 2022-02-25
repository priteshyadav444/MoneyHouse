import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import PhoneIcon from "@material-ui/icons/Phone";
import TabletIcon from "@material-ui/icons/Tablet";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
  },
  btn: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
}));

const SubmitBid = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Desktop", "Tablet", "Mobile"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "Desktop",
      value: 63,
      icon: LaptopMacIcon,
      color: colors.indigo[500],
    },
    {
      title: "Tablet",
      value: 15,
      icon: TabletIcon,
      color: colors.red[600],
    },
    {
      title: "Mobile",
      value: 23,
      icon: PhoneIcon,
      color: colors.orange[600],
    },
  ];
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Card className={clsx(classes.root, className)} {...rest}>
        <Box mt={2} mb={2}>
          <Typography color="error" variant="h4" align="center">
            Submit Your Bid
          </Typography>
        </Box>
        <Divider />
        <CardContent>
          <Box height={200} position="relative" ml={4} mr={4}>
            <Typography color="textSecondary" variant="subtitle1">
              Current Bid Price :
              <Typography
                color="error"
                variant="h4"
                style={{ display: "inline-block" }}
              >
                ₹ 17,14752
              </Typography>
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              Number of Bid :
              <Typography
                color="error"
                variant="h4"
                style={{ display: "inline-block" }}
              >
                5
              </Typography>
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              Bid Placed By :
              <Typography
                color="error"
                variant="h4"
                style={{ display: "inline-block" }}
              >
                Pritesh Y
              </Typography>
            </Typography>
            <TextField
              id="outlined"
              color="secondary"
              label="Bid Amount"
              value="1714752"
            />
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              className={classes.btn}
              onClick={handleClick}
            >
              Submit Your Bid
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

SubmitBid.propTypes = {
  className: PropTypes.string,
};

export default SubmitBid;
