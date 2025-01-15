// components/ShareButton.js
import React from "react";
import { Button } from "../../../components/ui/button";

const ShareButton = ({ url, title, text, className, children }) => {
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
    <Button variant="outline" onClick={handleShare} size="sm" className="flex gap-2">
      {children}
    </Button>
  );
};

export default ShareButton;
