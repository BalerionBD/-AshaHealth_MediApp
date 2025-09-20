'use client';

import { Button } from './ui/button';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function DownloadReport() {
  const handleDownload = () => {
    const reportContent = document.getElementById('report-content');
    if (reportContent) {
      // Temporarily remove the download button from the content to be captured
      const downloadButton = reportContent.querySelector('#download-button');
      if (downloadButton) {
        (downloadButton as HTMLElement).style.display = 'none';
      }

      html2canvas(reportContent, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        onclone: (document) => {
          // This ensures mermaid SVGs are visible in the canvas
          const svgs = Array.from(document.querySelectorAll('#report-content svg'));
          for (const svg of svgs) {
            const canvas = document.createElement('canvas');
            canvas.width = svg.clientWidth * 2;
            canvas.height = svg.clientHeight * 2;
            const ctx = canvas.getContext('2d');
            if (!ctx) continue;
            
            const xml = new XMLSerializer().serializeToString(svg);
            const img = new Image();
            img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(xml)));
            
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/png');
                const newImg = document.createElement('img');
                newImg.src = dataUrl;
                svg.parentNode?.replaceChild(newImg, svg);
            };
          }
        }
      }).then(canvas => {
        // Restore download button
        if (downloadButton) {
          (downloadButton as HTMLElement).style.display = 'inline-flex';
        }

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4',
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const widthInPdf = pdfWidth - 40; // with some margin
        const heightInPdf = widthInPdf / ratio;
        
        let heightLeft = heightInPdf;
        let position = 20;

        pdf.addImage(imgData, 'PNG', 20, position, widthInPdf, heightInPdf);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - heightInPdf;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 20, position, widthInPdf, heightInPdf);
            heightLeft -= pdfHeight;
        }

        pdf.save(`Asha-Health-Report-${new Date().toLocaleDateString()}.pdf`);
      }).catch(err => {
        console.error("Error generating PDF:", err);
         if (downloadButton) {
          (downloadButton as HTMLElement).style.display = 'inline-flex';
        }
      });
    }
  };

  return (
    <Button onClick={handleDownload} id="download-button">
      <Download className="mr-2 h-4 w-4" />
      Download Report
    </Button>
  );
}
