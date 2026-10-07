"use client";

import { useEffect } from "react";

export function Tracking() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const pixel = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  useEffect(() => {
    if (ga && !document.getElementById("kaamkar-ga")) {
      const script = document.createElement("script");
      script.id = "kaamkar-ga";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
      document.head.appendChild(script);
      const inline = document.createElement("script");
      inline.id = "kaamkar-ga-inline";
      inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`;
      document.head.appendChild(inline);
    }
    if (pixel && !document.getElementById("kaamkar-pixel")) {
      const script = document.createElement("script");
      script.id = "kaamkar-pixel";
      script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`;
      document.head.appendChild(script);
    }
  }, [ga, pixel]);
  return null;
}
