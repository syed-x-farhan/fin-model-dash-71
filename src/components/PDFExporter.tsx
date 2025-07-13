import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFExporterProps {
  title: string;
  subtitle?: string;
  dashboardType: 'dcf' | 'lbo' | 'startup' | 'three-statement';
  data?: any;
  className?: string;
}

interface MetricData {
  label: string;
  value: string;
  change?: string;
  description?: string;
}

const PDFExporter: React.FC<PDFExporterProps> = ({ 
  title, 
  subtitle, 
  dashboardType, 
  data,
  className = "" 
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const generateProfessionalPDF = async () => {
    setIsExporting(true);
    
    try {
      // Create new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Helper function to add text with word wrap
      const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12, style: 'normal' | 'bold' = 'normal') => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', style);
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + (lines.length * fontSize * 0.35);
      };

      // Header
      pdf.setFillColor(59, 130, 246); // Primary blue
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      // Title
      pdf.setTextColor(255, 255, 255);
      yPosition = addText(title, margin, 20, pageWidth - 2 * margin, 18, 'bold');
      
      if (subtitle) {
        yPosition = addText(subtitle, margin, yPosition + 2, pageWidth - 2 * margin, 12, 'normal');
      }

      // Date and time
      const now = new Date();
      const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
      yPosition = addText(`Generated on: ${dateStr}`, margin, yPosition + 5, pageWidth - 2 * margin, 10, 'normal');
      
      yPosition = 50; // Reset position after header
      pdf.setTextColor(0, 0, 0); // Reset to black

      // Executive Summary Section
      yPosition = addText('Executive Summary', margin, yPosition + 10, pageWidth - 2 * margin, 16, 'bold');
      yPosition += 5;
      
      pdf.setDrawColor(59, 130, 246);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // Dashboard-specific content
      const metrics = getDashboardMetrics(dashboardType, data);
      
      // Key Metrics Table
      yPosition = addText('Key Financial Metrics', margin, yPosition, pageWidth - 2 * margin, 14, 'bold');
      yPosition += 10;

      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, 'F');
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Metric', margin + 5, yPosition);
      pdf.text('Value', margin + 80, yPosition);
      pdf.text('Change', margin + 120, yPosition);
      pdf.text('Description', margin + 150, yPosition);
      
      yPosition += 10;

      // Table rows
      pdf.setFont('helvetica', 'normal');
      metrics.forEach((metric, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = margin;
        }

        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 8, 'F');
        }

        pdf.text(metric.label, margin + 5, yPosition);
        pdf.text(metric.value, margin + 80, yPosition);
        pdf.text(metric.change || 'N/A', margin + 120, yPosition);
        
        const descLines = pdf.splitTextToSize(metric.description || '', 40);
        pdf.text(descLines[0] || '', margin + 150, yPosition);
        
        yPosition += 8;
      });

      // Add analysis section
      yPosition += 10;
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }

      yPosition = addText('Financial Analysis', margin, yPosition, pageWidth - 2 * margin, 14, 'bold');
      yPosition += 5;
      
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      const analysis = getDashboardAnalysis(dashboardType);
      yPosition = addText(analysis, margin, yPosition, pageWidth - 2 * margin, 11, 'normal');

      // Add model assumptions
      yPosition += 15;
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }

      yPosition = addText('Key Assumptions', margin, yPosition, pageWidth - 2 * margin, 14, 'bold');
      yPosition += 5;
      
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      const assumptions = getDashboardAssumptions(dashboardType);
      assumptions.forEach(assumption => {
        yPosition = addText(`• ${assumption}`, margin + 5, yPosition, pageWidth - 2 * margin - 10, 10, 'normal');
        yPosition += 2;
      });

      // Footer
      const footerY = pageHeight - 15;
      pdf.setFontSize(8);
      pdf.setTextColor(128, 128, 128);
      pdf.text('Generated by Financial Dashboard - Confidential', margin, footerY);
      pdf.text('Page 1', pageWidth - margin - 20, footerY);

      // Save the PDF
      const fileName = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getDashboardMetrics = (type: string, data?: any): MetricData[] => {
    switch (type) {
      case 'dcf':
        return [
          { label: 'Enterprise Value', value: '$842M', change: '+12.5%', description: 'Present value of free cash flows' },
          { label: 'WACC', value: '9.2%', change: '+0.3%', description: 'Weighted average cost of capital' },
          { label: 'Terminal Growth', value: '2.5%', change: 'Stable', description: 'Long-term growth assumption' },
          { label: 'Terminal Value', value: '$695M', change: '+15.2%', description: '82% of enterprise value' }
        ];
      case 'lbo':
        return [
          { label: 'Purchase Price', value: '$120M', change: 'N/A', description: '8.0x EBITDA Multiple' },
          { label: 'Equity IRR', value: '24.5%', change: '+2.1%', description: '5-year holding period return' },
          { label: 'MOIC', value: '2.9x', change: '+0.4x', description: 'Money-on-money multiple' },
          { label: 'Exit Value', value: '$184M', change: '+53.3%', description: '8.0x Exit Multiple' }
        ];
      case 'startup':
        return [
          { label: 'Monthly Revenue', value: '$87K', change: '+32%', description: 'Month-over-month growth' },
          { label: 'Burn Rate', value: '$75K', change: '-8%', description: 'Monthly operating expenses' },
          { label: 'Active Users', value: '1,847', change: '+18%', description: '5% monthly churn rate' },
          { label: 'Runway', value: '18 mo', change: '+3 mo', description: 'Until next funding round' }
        ];
      case 'three-statement':
        return [
          { label: 'Total Revenue', value: '$45.2M', change: '+18.5%', description: 'Annual revenue growth' },
          { label: 'Net Income', value: '$8.4M', change: '+22.1%', description: '18.6% net margin' },
          { label: 'EBITDA', value: '$12.8M', change: '+19.8%', description: '28.3% EBITDA margin' },
          { label: 'Free Cash Flow', value: '$9.6M', change: '+25.4%', description: 'Operating cash flow less CapEx' }
        ];
      default:
        return [];
    }
  };

  const getDashboardAnalysis = (type: string): string => {
    switch (type) {
      case 'dcf':
        return 'The DCF analysis indicates a strong enterprise valuation of $842M, driven by robust free cash flow generation and conservative growth assumptions. The terminal value represents 82% of total enterprise value, highlighting the importance of long-term cash flow sustainability. The 9.2% WACC reflects current market conditions and company-specific risk factors.';
      case 'lbo':
        return 'The LBO analysis demonstrates attractive returns with a 24.5% equity IRR and 2.9x money multiple over a 5-year holding period. The transaction is structured with moderate leverage, allowing for debt paydown through strong cash generation while maintaining operational flexibility. Exit assumptions are based on comparable transaction multiples.';
      case 'startup':
        return 'The startup model shows strong unit economics with 32% month-over-month revenue growth and improving operational efficiency. The current burn rate provides an 18-month runway, sufficient time to achieve key milestones for the next funding round. Customer acquisition metrics indicate sustainable growth potential.';
      case 'three-statement':
        return 'The three-statement model demonstrates strong financial performance across all key metrics. Revenue growth of 18.5% is supported by expanding market share and new product launches. Margin expansion reflects operational leverage and cost optimization initiatives. Strong free cash flow generation supports both growth investments and shareholder returns.';
      default:
        return 'Financial analysis and key insights based on the dashboard metrics and projections.';
    }
  };

  const getDashboardAssumptions = (type: string): string[] => {
    switch (type) {
      case 'dcf':
        return [
          'Revenue growth rate of 8-12% annually over projection period',
          'EBITDA margins stabilizing at 28-30% by terminal year',
          'Capital expenditure at 3-4% of revenue',
          'Terminal growth rate of 2.5% reflecting long-term GDP growth',
          'WACC calculation based on current capital structure and market conditions'
        ];
      case 'lbo':
        return [
          'Initial leverage of 5.5x Total Debt / EBITDA',
          'Annual EBITDA growth of 6-8% through operational improvements',
          'Debt paydown from excess cash flow generation',
          'Exit multiple of 8.0x EBITDA consistent with entry valuation',
          'Management equity participation of 10-15%'
        ];
      case 'startup':
        return [
          'Customer acquisition cost trending downward with scale',
          'Monthly churn rate stabilizing at 5% or below',
          'Average revenue per user growing 10% annually',
          'Operating leverage improving with scale',
          'Series B funding round in 12-18 months'
        ];
      case 'three-statement':
        return [
          'Organic revenue growth of 15-20% annually',
          'Gross margins improving through operational efficiency',
          'Working capital management maintaining 30-day cycles',
          'Capital expenditure supporting growth initiatives',
          'Tax rate of 25% reflecting current regulatory environment'
        ];
      default:
        return ['Key model assumptions and parameters'];
    }
  };

  return (
    <Button
      onClick={generateProfessionalPDF}
      disabled={isExporting}
      variant="outline"
      size="sm"
      className={`gap-2 ${className}`}
    >
      {isExporting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isExporting ? 'Generating...' : 'Export PDF'}
    </Button>
  );
};

export default PDFExporter;