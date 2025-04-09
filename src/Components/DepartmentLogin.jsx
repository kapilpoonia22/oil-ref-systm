import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DepartmentLogin = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = () => {
    if (!mobile || mobile.length < 10) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Department Login</h2>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <div className="form-container">
          <div className="form-group">
            <label>Mobile Number</label>
            <div className="input-group">
              <span className="country-code">+91</span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                required
              />
            </div>
          </div>

          {!otpSent ? (
            <button
              type="button"
              onClick={handleVerify}
              disabled={isLoading || !mobile}
              className={`primary-button ${!mobile ? 'disabled' : ''}`}
            >
              {isLoading ? (
                <span className="loader-container">
                  <span className="loader"></span>
                  Processing...
                </span>
              ) : (
                'Send OTP'
              )}
            </button>
          ) : (
            <>
              <div className="form-group">
                <label>OTP Verification</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  required
                />
                <p className="help-text">
                  OTP sent to +91{mobile}.
                  <button className="text-link">Resend</button>
                </p>
              </div>

              <Link to="/department-dashboard" className="full-width">
                <button
                  type="button"
                  disabled={!otp || otp.length < 6}
                  className={`primary-button ${(!otp || otp.length < 6) ? 'disabled' : ''}`}
                >
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        <div className="footer">
          <p>
            Need help? <a href="#" className="text-link">Contact Support</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e6f0ff 0%, #e6e6ff 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 420px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-header h2 {
          font-size: 28px;
          color: #333;
          margin: 0 0 10px 0;
        }

        .login-header p {
          color: #666;
          margin: 0;
          font-size: 16px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .input-group {
          position: relative;
        }

        .country-code {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        input {
          width: 100%;
          padding: 12px;
          padding-left: 40px;
          border: 1px solid #d1d1d1;
          border-radius: 6px;
          font-size: 16px;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }

        .input-group input {
          padding-left: 40px;
        }

        .primary-button {
          width: 100%;
          padding: 12px 24px;
          background-color: #4f46e5;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
          font-size: 16px;
        }

        .primary-button:hover {
          background-color: #4338ca;
        }

        .primary-button.disabled {
          background-color: #a5a5a5;
          cursor: not-allowed;
        }

        .help-text {
          font-size: 14px;
          color: #666;
          margin: 6px 0 0 0;
        }

        .text-link {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          margin-left: 4px;
          border: none;
          background: none;
          padding: 0;
        }

        .text-link:hover {
          text-decoration: underline;
          color: #4338ca;
        }

        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }

        .full-width {
          display: block;
          width: 100%;
        }

        .loader-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DepartmentLogin;