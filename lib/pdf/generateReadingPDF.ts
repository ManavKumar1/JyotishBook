"use client";

import jsPDF from "jspdf";
import { User } from "@/types/user";
import PosterImg from "@/assets/Posterimg.png";

type Reading = {
  readingDate: string;
  readingTime: string;
  questions: string[];
  prediction: string;
};

export async function generateReadingPDF(
  reading: Reading,
  user?: User
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  let y = 20;

  /* =====================================================
     HELPERS
     ===================================================== */

  const addPageIfNeeded = (extraSpace = 20) => {
    if (y > pageHeight - extraSpace) {
      doc.addPage();
      y = 20;
    }
  };

  const sectionHeader = (title: string) => {
    addPageIfNeeded(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title.toUpperCase(), 14, y);
    y += 4;

    doc.setDrawColor(200);
    doc.line(14, y, pageWidth - 14, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
  };

  const addFooterToAllPages = () => {
    const pageCount = doc.getNumberOfPages();

    doc.setFontSize(9);
    doc.setTextColor(120);

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        "Created by Manav Vedic Astro System",
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    }
  };

  /* =====================================================
     COVER PAGE
     ===================================================== */

  const poster = new Image();
  poster.src = PosterImg.src;

  await new Promise<void>((resolve) => {
    poster.onload = () => resolve();
  });

  doc.addImage(poster, "PNG", 0, 0, pageWidth, pageHeight);

  /* =====================================================
     CONTENT PAGE
     ===================================================== */

  doc.addPage();
  y = 20;

  /* =====================================================
     HEADER
     ===================================================== */

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Manav Vedic Astro Reading", pageWidth / 2, y, {
    align: "center",
  });
  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  /* =====================================================
     USER DETAILS
     ===================================================== */

  sectionHeader("Client Details");

  if (user) {
    doc.text(`Name: ${user.name}`, 18, y); y += 6;
    doc.text(`Date of Birth: ${user.dob}`, 18, y); y += 6;
    doc.text(`Place of Birth: ${user.pob}`, 18, y); y += 6;
  }

  doc.text(`Reading Date: ${reading.readingDate}`, 18, y); y += 6;
  doc.text(`Reading Time: ${reading.readingTime}`, 18, y); y += 10;

  /* =====================================================
     KUNDALI
     ===================================================== */

  if (user?.kundali) {
    sectionHeader("Kundali Overview");

    doc.text(`Lagna Sign: ${user.kundali.lagnaSign}`, 18, y);
    y += 8;

    Object.entries(user.kundali.houses).forEach(([_, value], index) => {
      addPageIfNeeded();
      const line = `${index + 1} House: ${value || "-"}`;
      const lines = doc.splitTextToSize(line, 170);
      doc.text(lines, 18, y);
      y += lines.length * 6;
    });

    y += 8;
  }

  /* =====================================================
     QUESTIONS
     ===================================================== */

  sectionHeader("Questions Asked");

  reading.questions.forEach((q, i) => {
    addPageIfNeeded();
    const lines = doc.splitTextToSize(`${i + 1}. ${q}`, 170);
    doc.text(lines, 18, y);
    y += lines.length * 6 + 2;
  });

  y += 6;

  /* =====================================================
     PREDICTION (MULTI-PAGE SAFE)
     ===================================================== */

  sectionHeader("Astrological Prediction");

  const predictionLines = doc.splitTextToSize(reading.prediction, 170);

  predictionLines.forEach((line : any) => {
    addPageIfNeeded(15);

    if (line.trim() === "") {
      y += 4;
    } else {
      doc.text(line, 18, y);
      y += 6;
    }
  });

  /* =====================================================
     FOOTER ON EVERY PAGE
     ===================================================== */

  addFooterToAllPages();

  /* =====================================================
     SAVE
     ===================================================== */

  doc.save(`Astro_Reading_${reading.readingDate}.pdf`);
}
