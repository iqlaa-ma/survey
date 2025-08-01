"use client"
import { useEffect, useState } from "react";

export default function CustomRecaptcha({ onVerificationChange }) {
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=6LfXyFMrAAAAAGgAYJlxNMxhM1xoJiGN3U16t_W5`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (isRobotChecked && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute("6LfXyFMrAAAAAGgAYJlxNMxhM1xoJiGN3U16t_W5", { action: "submit" }).then((token) => {
          fetch("/api/verify-captcha", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.message);
              if (data.message == "Verification passed") {
                setIsVerified(true);
                onVerificationChange?.(true);
                console.log("Captcha verified successfully");
              } else {
                alert("Captcha verification failed, please try again.");
                setIsRobotChecked(false);
                setIsVerified(false);
                onVerificationChange?.(false);
              }
            })
            .catch(() => {
              alert("Verification error, please try again.");
              setIsRobotChecked(false);
              setIsVerified(false);
              onVerificationChange?.(false);
            });
        });
      });
    } else {
      setIsVerified(false);
      onVerificationChange?.(false);
    }
  }, [isRobotChecked]);

  return (
    <div className="mb-8 md:mb-12 flex justify-center">
      <div className="bg-gray-100 p-4 rounded border-2 border-gray-300 max-w-xs w-full">
        <div className="flex items-center gap-3">
          <div 
            className={`w-6 h-6 border-2 rounded cursor-pointer flex items-center justify-center transition-colors ${
              isRobotChecked && isVerified ? 'bg-blue-500 border-blue-500' : 
              isRobotChecked ? 'bg-gray-400 border-gray-400' : 
              'border-gray-400 bg-white'
            }`}
            onClick={() => {
              setIsRobotChecked(!isRobotChecked);
              if (isVerified) {
                setIsVerified(false);
                onVerificationChange?.(false);
              }
            }}
          >
            {(isRobotChecked && isVerified) && (
              <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {(isRobotChecked && !isVerified) && (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <span className="text-gray-700 text-sm">I&apos;m not a robot</span>
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iNCIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTYuNSAyMC41TDEyIDI1TDguNSAyMS41IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMzEuNSAxNC41TDI3IDEwTDIzLjUgMTMuNSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+" 
            alt="reCAPTCHA" 
            className="w-10 h-10"
          />
        </div>
        <div className="text-xs text-gray-500 mt-2 text-right">
          <span>reCAPTCHA</span>
          <div className="text-xs">Privacy - Terms</div>
        </div>
      </div>
    </div>
  );
}