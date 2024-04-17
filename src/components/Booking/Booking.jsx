import React, { useRef, useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 850;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  //   Send data to the server
  const handleClick = async (e) => {
    // e.preventDefault();

    // console.log(booking)

    // try {
    //   if(!user || user===undefined || user===null){
    //     return alert('Please sign in')
    //   }

    //   const res = await fetch(`${BASE_URL}/booking`, {
    //     method: 'post',
    //     headers: {
    //       'content-type': 'application/json',
    //     },
    //     credentials: 'include',
    //     body: JSON.stringify(booking)
    //   })

    //   const result = await res.json()

    //   if(!res.ok){
    //     return alert(result.message);
    //   }
    //   // navigate("/thank-you");

    // } catch (err) {
    //   alert(arr.message);
    // }

    console.log(booking);
  };

  const makePayment = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }
      const stripe = await loadStripe(
        "pk_test_51NGKYqSHG7TmWX9vHqmETNEjEIcWDGi4qID31yPPievfMC2g2CixXuP2e8e62hR1SPUVjJsUUEXwFi6yLMFXK0WP00nT6WMJtg"
      );

      const body = {
        tourPackage: {
          ...booking,
          serviceFee: serviceFee,
          totalAmount: totalAmount,
        },
      };

      const headers = {
        "content-type": "application/json",
      };

      const response = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: headers,
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const session = await response.json();
      // console.log(session.sessionId)
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking form */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={makePayment}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      {/* Booking button */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span>₹{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <button className="btn primary__btn w-100 mt-4" onClick={makePayment}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Booking;
