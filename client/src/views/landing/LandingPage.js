import { React } from "react";

import "../../style.css";
import Logo from "../../components/Logo";
import Page from "../../components/Page";
import { Hidden } from "@material-ui/core";

export default function LandingPage() {
  return (
    <>
      <Page title="Welcome to  Moneyhouse.com">
        <div>
          {/* ======= Header ======= */}
          <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center">
              <a href="/">
                <Logo />
              </a>
              {/* Uncomment below if you prefer to use an image logo */}
              {/* <a href="http://moneyhouse-in.herokuapp.com/" class="logo mr-auto"><img src="assets/img/logo.png" alt=""></a>*/}
              <nav className="nav-menu d-lg-block ml-auto">
                <ul>
                  <Hidden smDown>
                    <li>
                      <a href="#about">About</a>
                    </li>
                    <li>
                      <a href="#services">Services</a>
                    </li>
                    <li>
                      <a href="#contact">Contact</a>
                    </li>
                  </Hidden>
                  <li>
                    <a href="/home">Login</a>
                  </li>
                  <li>
                    <a href="/register">Signup</a>
                  </li>
                </ul>
              </nav>
              {/* .nav-menu */}
            </div>
          </header>
          {/* End Header */}
          {/* ======= Hero Section ======= */}
          <section id="hero" className="d-flex align-items-center">
            <div className="container" data-aos="zoom-out" data-aos-delay={100}>
              <h1>
                Welcome to <span>MoneyHouse</span>
              </h1>
              <h2>Making your investment easy .</h2>
              <div className="d-flex">
                <a href="/register" className="btn-get-started scrollto">
                  SignUp Today
                </a>
              </div>
            </div>
          </section>
          {/* End Hero */}
          <main id="main">
            {/* ======= Featured Services Section ======= */}
            {/* End Featured Services Section */}
            {/* ======= About Section ======= */}
            <section id="about" className="about section-bg">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h2>About</h2>
                  <h3>
                    What is MoneyHouse ? <span>About Us</span>
                  </h3>
                </div>
                <div className="row">
                  <div
                    className="col-lg-6"
                    data-aos="zoom-out"
                    data-aos-delay={100}
                  >
                    <img
                      src="static/images/about1.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                  <div
                    className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center"
                    data-aos="fade-up"
                    data-aos-delay={100}
                  >
                    <h3>
                    MoneyHouse involves a group of people where each person contributes a certain amount of money towards a pool of funds On a Monthly Basis and 
                    the Pool amount is collected. A Reverse auction happens among the members to grant this pool Amount to any of the members in the group. 
                    This Auction occurs for those members who have not taken the pool once and other benefited members have to pay their contribution every time.
                    </h3>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div
                    className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-nowrap flex-column justify-content-center"
                    data-aos="fade-up"
                    data-aos-delay={100}
                  >
                    <h3>
                    Let’s assume 5 members took a part in the pool of 50,000. 
                    Each Contributed 10,000. One of the members places a Bid amount of ₹ 4,000  and he wins the auction because no other members place a bid higher than him. 
                    So That Member will get ₹ 46,000 (Pool of ₹ 50,000 at a loss of ₹ 4,000). 
                    The remaining ₹ 4,000 bid amount is equally distributed among the other 4 members. 
                    They have to pay ₹ 9,000 only (₹ 10,000 - ₹ 1,000) in next month's Pool collection. 
                    So at an investment of ₹ 10,000, each member gets a profit of ₹ 1,000 upfront and the Winner Gets the pool Amount on that day as a loan but he has to pay ₹ 10,000 in the next Pool.
                    </h3>
                  </div>
                  <div
                    className="col-lg-6 pt-4"
                    data-aos="zoom-out"
                    data-aos-delay={100}
                  >
                    <img
                      src="static/images/about2.jpg"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </section>
            {/* End About Section */}
            {/* ======= Services Section ======= */}
            <section id="services" className="services">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h2>Services</h2>
                  <h3>
                    How It Works? <span>Services</span>
                  </h3>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div
                      className="icon-box"
                      data-aos="fade-up"
                      data-aos-delay={100}
                    >
                      <div className="icon">
                        {" "}
                        <i className="icofont-ui-home" />
                      </div>
                      <h4 className="title">
                        <a href>Join House</a>
                      </h4>
                      <p className="description">
                        To Bid House First Join House From Home Section After
                        Login By Paying Entry Amount.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div
                      className="icon-box"
                      data-aos="fade-up"
                      data-aos-delay={200}
                    >
                      <div className="icon">
                        <i className="icofont-chart-histogram" />
                      </div>
                      <h4 className="title">
                        <a href>Bid House</a>
                      </h4>
                      <p className="description">
                        You Can See All Stat Of Your Joined House From Portfolio
                        Section By Clicking Bid House You Can Bid Auction
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div
                      className="icon-box"
                      data-aos="fade-up"
                      data-aos-delay={300}
                    >
                      <div className="icon">
                        <i className="icofont-court-hammer" />
                      </div>
                      <h4 className="title">
                        <a href>Submit Bid</a>
                      </h4>
                      <p className="description">
                        When Auction is Live you can Submit your Bid from Submit
                        Bid Section .You Cant Bid For More Than Half Amount Of
                        Pool
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                    <div
                      className="icon-box"
                      data-aos="fade-up"
                      data-aos-delay={400}
                    >
                      <div className="icon">
                        <i className="icofont-win-trophy" />
                      </div>
                      <h4 className="title">
                        <a href>Win Bid</a>
                      </h4>
                      <p className="description">
                        When You WOn the Bid. You Will Wet The Mail . Pool
                        Amount Is Credited To Your Wallet With In Days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* End Services Section */}
            {/* ======= Counts Section ======= */}
            <section id="counts" className="counts">
              <div className="container" data-aos="fade-up">
                <div className="row">
                  <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                    <div className="count-box">
                      <i className="icofont-simple-smile" />
                      <span data-toggle="counter-up">26</span>
                      <p>Total Member</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                    <div className="count-box">
                      <i className="icofont-document-folder" />
                      <span data-toggle="counter-up">12</span>
                      <p>Total House</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                    <div className="count-box">
                      <i className="icofont-document-folder" />
                      <span data-toggle="counter-up">5</span>
                      <p>Total House Running </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                    <div className="count-box">
                      <i className="icofont-live-support" />
                      <span data-toggle="counter-up">₹1200</span>
                      <p>Total Amount Pooled</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* End Counts Section */}
            {/* ======= Frequently Asked Questions Section ======= */}
            <section id="faq" className="faq section-bg">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h2>F.A.Q</h2>
                  <h3>
                    Frequently Asked <span>Questions</span>
                  </h3>
                </div>
                <ul
                  className="faq-list"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <li>
                    <a data-toggle="collapse" className href="#faq1">
                      How To Join House? <i className="icofont-simple-up" />
                    </a>
                    <div
                      id="faq1"
                      className="collapse show"
                      data-parent=".faq-list"
                    >
                      <p>
                        First Add Money In Your Wallet By Paying Online or You
                        Can Request Money to Admin. Then You Can Join House From
                        Home Section
                      </p>
                    </div>
                  </li>
                  <li>
                    <a data-toggle="collapse" className href="#faq2">
                      How To Add Money In Wallet?{" "}
                      <i className="icofont-simple-up" />
                    </a>
                    <div
                      id="faq2"
                      className="collapse show"
                      data-parent=".faq-list"
                    >
                      <p>
                        Goto Wallet Section &gt; AddMoney &gt; Request Admin or
                        PayOnline &gt; Enter Amount to Request . if Online
                        Payment Enter Valid Bank Detail And Pay Online. if You
                        are requested Payment to Admin Wait For Approval.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
            {/* End Frequently Asked Questions Section */}
            {/* ======= Contact Section ======= */}
            <section id="contact" className="contact">
              <div className="container" data-aos="fade-up">
                <div className="section-title">
                  <h2>Contact</h2>
                  <h3>
                    <span>Contact Us</span>
                  </h3>
                </div>
                <div className="row" data-aos="fade-up" data-aos-delay={100}>
                  <div className="col-lg-6">
                    <div className="info-box mb-4">
                      <i className="bx bx-map" />
                      <h3>Our Address</h3>
                      <p>
                        {" "}
                        SHOP NO 10A AZAD HEIGHT DEGAM STREET VAPI, GJ 395195
                        INDIA{" "}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="info-box  mb-4">
                      <i className="bx bx-envelope" />
                      <h3>Email Us</h3>
                      <p>money.house.444@gmail.com</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="info-box  mb-4">
                      <i className="bx bx-phone-call" />
                      <h3>Call Us</h3>
                      <p>+91 9104 104 274</p>
                    </div>
                  </div>
                </div>
                <div className="row" data-aos="fade-up" data-aos-delay={100}>
                  <div className="col-lg-6 ">
                    <iframe
                      className="mb-4 mb-lg-0"
                      title="map"
                      src="https://maps.google.com/maps?q=degam%20road%20vapi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      style={{ border: 0, width: "100%", height: "384px" }}
                      allowFullScreen
                      frameBorder={0}
                    />
                  </div>
                  <div className="col-lg-6">
                    <form
                      action="contact.php"
                      method="post"
                      className="php-email-form"
                    >
                      <div className="form-row">
                        <div className="col form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Your Name"
                            data-rule="minlen:4"
                            data-msg="Please enter at least 4 chars"
                          />
                          <div className="validate" />
                        </div>
                        <div className="col form-group">
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Your Email"
                            data-rule="email"
                            data-msg="Please enter a valid email"
                          />
                          <div className="validate" />
                        </div>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          data-rule="minlen:4"
                          data-msg="Please enter at least 8 chars of subject"
                        />
                        <div className="validate" />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          name="message"
                          rows={5}
                          data-rule="required"
                          data-msg="Please write something for us"
                          placeholder="Message"
                          defaultValue={""}
                        />
                        <div className="validate" />
                      </div>
                      <div className="mb-3">
                        <div className="loading">Loading</div>
                        <div className="error-message" />
                        <div className="sent-message">
                          Your message has been sent. Thank you!
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" disabled="disabled">
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
            {/* End Contact Section */}
          </main>
          {/* End #main */}
          {/* ======= Footer ======= */}
          <footer id="footer">
            <div className="footer-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6 footer-contact">
                    <h3>
                      MoneyHouse<span>.</span>
                    </h3>
                    <p>
                      SHOP NO 10A AZAD HEIGHT DEGAM STREET <br />
                      VAPI, GJ 395195
                      <br />
                      INDIA <br />
                      <br />
                      <strong>Phone:</strong> +91 9104 104 274
                      <br />
                      <strong>Email:</strong> money.house.444@gmail.com
                      <br />
                    </p>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                      <li>
                        <i className="bx bx-chevron-right" />{" "}
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <i className="bx bx-chevron-right" />{" "}
                        <a href="/">About us</a>
                      </li>
                      <li>
                        <i className="bx bx-chevron-right" />{" "}
                        <a href="/">Services</a>
                      </li>
                      <li>
                        <i className="bx bx-chevron-right" />{" "}
                        <a href="/">Terms of service</a>
                      </li>
                      <li>
                        <i className="bx bx-chevron-right" />{" "}
                        <a href="/">Privacy policy</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>Our Social Networks</h4>
                    <p>Follow us on </p>
                    <div className="social-links mt-3">
                      <a href="/" className="twitter">
                        <i className="bx bxl-twitter" />
                      </a>
                      <a href="/" className="facebook">
                        <i className="bx bxl-facebook" />
                      </a>
                      <a href="/" className="instagram">
                        <i className="bx bxl-instagram" />
                      </a>
                      <a href="/" className="google-plus">
                        <i className="bx bxl-skype" />
                      </a>
                      <a href="/" className="linkedin">
                        <i className="bx bxl-linkedin" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container py-4">
              <div className="copyright">
                © Copyright 2021
                <strong>
                  <span> MoneyHouse</span>
                </strong>
                . All Rights Reserved
              </div>
              <div className="credits">Designed by MoneyHouse</div>
            </div>
          </footer>
          {/* End Footer */}

          <a href="/" className="back-to-top">
            <i className="icofont-simple-up" />
          </a>
        </div>
      </Page>
    </>
  );
}
