'use client';

import React from 'react';

const ShareButtons = () => {
  const shareText = 'شارك في هذا الاستطلاع المهم';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareTo = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);

    let shareLink = '';

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodedText}%0A${encodedUrl}`;
        break;
      default:
        return;
    }

    window.open(shareLink, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('تم نسخ الرابط!');
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      <button
        onClick={() => shareTo('facebook')}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Facebook
      </button>
      <button
        onClick={() => shareTo('twitter')}
        className="bg-blue-400 text-white px-4 py-2 rounded"
      >
        Twitter
      </button>
      <button
        onClick={() => shareTo('whatsapp')}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        WhatsApp
      </button>
      <button
        onClick={copyLink}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        انسخ الرابط
      </button>
    </div>
  );
};

export default ShareButtons;
