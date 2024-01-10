import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterMobileNumber = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Flag to track if OTP is sent
  const navigate = useNavigate();
  const [otp, setOtp] = useState();

  const handleSendOTP = async () => {
    const formData = new URLSearchParams();
    formData.append("phone", mobileNumber);
    formData.append("dial_code", "+91");

    try {
      const response = await fetch(
        "https://staging.fastor.in/v1/pwa/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      if (response.ok) {
        setOtpSent(true);
        alert("OTP sent successfully! Please enter OTP received.");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleVerifyOTP = async () => {
    const formData = new URLSearchParams();
    formData.append("phone", mobileNumber);
    formData.append("dial_code", "+91");
    formData.append("otp", otp);

    try {
      const response = await fetch(
        "https://staging.fastor.in/v1/pwa/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("OTP verified successfully! User logged in.");
        const data = await response.json();
        localStorage.setItem("token", data.data.token);
        navigate("/restaurants");
      } else {
        alert("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
      <div style={{ width: "350px", height: "300px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
       
        
        {!otpSent ? (
          <div>
             <h2 style={{marginBottom:"10px"}}>Enter Mobile Number</h2>
             <p style={{marginBottom:"50px"}}>We will send you the 4 digit verification conde</p>
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              style={{ width: "90%", padding: "8px", marginBottom: "15px",marginLeft:'4px' }}
            />
            <button
              onClick={handleSendOTP}
              style={{ width: "96%", padding: "10px",marginLeft:'3px', backgroundColor: "#FF4432", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", }}
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <h3>OTP Verification</h3>
            <p style={{marginBottom:"50px"}}>Enter the verification code we just sent on your Mobile Number.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ width: "90%", padding: "8px", marginBottom: "15px",marginLeft:'4px' }}
            />
            <button
              onClick={handleVerifyOTP}
              style={{ width: "96%", padding: "10px",marginLeft:'3px', backgroundColor: "#FF4432", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", }}
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterMobileNumber;
