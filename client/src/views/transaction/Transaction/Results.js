import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";

import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";

import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: colors.green[700],
  },
}));

const Results = ({ className, transaction, paymentApprove, ...rest }) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member Name</TableCell>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Payment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction
                .slice(page * limit, page * limit + limit)
                .map((data) => (
                  <TableRow hover key={data.requestid}>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {data.membername}
                      </Typography>
                    </TableCell>
                    <TableCell>{data.requestid}</TableCell>
                    <TableCell>
                      ₹
                      {Number(data.amounttoadd.$numberDecimal).toLocaleString(
                        "en-IN"
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        startIcon={<CheckCircleOutlineIcon />}
                        onClick={() =>
                          paymentApprove(
                            data.memberid,
                            data.requestid,
                            data.amounttoadd.$numberDecimal,
                            "approve"
                          )
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        onClick={() =>
                          paymentApprove(
                            data.memberid,
                            data.requestid,
                            data.amounttoadd.$numberDecimal,
                            "deny"
                          )
                        }
                      >
                        Deny
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={transaction.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  transaction: PropTypes.array.isRequired,
};

export default Results;
