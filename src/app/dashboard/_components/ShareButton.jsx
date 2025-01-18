// components/ShareButton.js
import React from "react";
import { Button } from "../../../components/ui";

const ShareButton = ({ url, title, text, className, children, size = "sm", variant = "outline" }) => {
  const handleShare = async (e) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <Button variant={variant} onClick={handleShare} size={size} className={`flex gap-2 ${className}`}>
      {children}
    </Button>
  );
};

export default ShareButton;
