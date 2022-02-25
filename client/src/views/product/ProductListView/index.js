import React, { useEffect, useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "../../../components/Page";
import ProductCard from "./ProductCard";

import Fab from "@material-ui/core/Fab";

import { getHouse } from "../../../action/houseAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SchemeCardSkeleton from "./SchemeCardSkeleton";
import NewScheme from "./NewScheme";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

const ProductList = ({ getHouse, housesdata, houseLoading }) => {
  const classes = useStyles();
  const [products, setProduct] = useState([]);
  useEffect(() => {
    getHouse(true);
  }, [getHouse]);
  useEffect(() => {
    setProduct(housesdata);
  }, [housesdata]);

  function skel() {
    return (
      <>
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
        <SchemeCardSkeleton />
      </>
    );
  }
  return (
    <Page className={classes.root} title="Live - MoneyHouse">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid container spacing={1}>
            {!houseLoading
              ? products.map((data) => (
                  <Grid item key={data.id} lg={12} md={12} xs={12}>
                    <ProductCard className={classes.productCard} data={data} />
                  </Grid>
                ))
              : skel()}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
        <Fab color="primary" className={classes.fab} aria-label="add">
          <NewScheme />
        </Fab>
      </Container>
    </Page>
  );
};

ProductList.propTypes = {
  getHouse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  housesdata: state.houses.houses,
  houseLoading: state.houses.loading,
});

export default connect(mapStateToProps, { getHouse })(ProductList);
