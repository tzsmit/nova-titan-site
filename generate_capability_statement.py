#!/usr/bin/env python3
"""
Generate Nova Titan Systems Federal Capability Statement PDF
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas

def create_capability_statement():
    """Generate the Federal Capability Statement PDF"""
    
    filename = "Nova-Titan-Systems-Federal-Capability-Statement.pdf"
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=0.75*inch,
        leftMargin=0.75*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch
    )
    
    # Container for the 'Flowable' objects
    elements = []
    
    # Define custom styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor('#1a1a2e'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    company_style = ParagraphStyle(
        'CompanyName',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#0f3460'),
        spaceAfter=12,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#0f3460'),
        spaceAfter=6,
        spaceBefore=12,
        fontName='Helvetica-Bold'
    )
    
    subheading_style = ParagraphStyle(
        'CustomSubHeading',
        parent=styles['Heading3'],
        fontSize=11,
        textColor=colors.HexColor('#16213e'),
        spaceAfter=4,
        spaceBefore=8,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontSize=10,
        textColor=colors.HexColor('#1a1a2e'),
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )
    
    # Company Header
    elements.append(Paragraph("NOVA TITAN SYSTEMS LLC", company_style))
    elements.append(Paragraph("Federal Capability Statement", title_style))
    elements.append(Spacer(1, 0.2*inch))
    
    # Company Information Table
    company_data = [
        ['COMPANY NAME:', 'Nova Titan Systems LLC'],
        ['ADDRESS:', '3223 S Loop 289, Suite 600<br/>Lubbock, TX 79423'],
        ['PHONE:', '(806) 370-0624'],
        ['EMAIL:', 'info@novatitan.net'],
        ['WEBSITE:', 'https://novatitan.net'],
    ]
    
    company_table = Table(company_data, colWidths=[1.5*inch, 4.5*inch])
    company_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1a1a2e')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))
    elements.append(company_table)
    elements.append(Spacer(1, 0.15*inch))
    
    # Government Readiness Section
    elements.append(Paragraph("GOVERNMENT READINESS", heading_style))
    
    gov_data = [
        ['UEI:', 'CZ8BLZMSKZ66'],
        ['CAGE CODE:', '170W6'],
        ['SAM.gov STATUS:', 'Active'],
        ['DSBS:', 'Verified Small Business'],
        ['TEXAS HUB:', 'In Progress'],
        ['CREDIT CARD:', 'Accepted for Micro-Purchases'],
        ['SERVICE AREA:', 'West Texas + Nationwide Remote'],
    ]
    
    gov_table = Table(gov_data, colWidths=[1.8*inch, 4.2*inch])
    gov_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1a1a2e')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f5f5f5')),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#0f3460')),
    ]))
    elements.append(gov_table)
    elements.append(Spacer(1, 0.1*inch))
    
    # NAICS/PSC Codes
    elements.append(Paragraph("NAICS & PSC CODES", heading_style))
    
    naics_text = """
    <b>Primary NAICS Codes:</b><br/>
    • 541519 – Other Computer Related Services (Primary)<br/>
    • 541512 – Computer Systems Design Services<br/>
    • 238210 – Electrical Contractors and Wiring Installation<br/>
    • 561621 – Security Systems Services<br/>
    <br/>
    <b>Primary PSC Codes:</b><br/>
    • D302 – IT &amp; Telecom: Systems Development<br/>
    • D310 – IT &amp; Telecom: Cybersecurity<br/>
    • D399 – IT &amp; Telecom: Other Services<br/>
    • R425 – Electrical &amp; Electronic Equipment Repair<br/>
    • J019 – Maintenance of Miscellaneous Buildings
    """
    elements.append(Paragraph(naics_text, body_style))
    elements.append(Spacer(1, 0.1*inch))
    
    # Company Overview
    elements.append(Paragraph("COMPANY OVERVIEW", heading_style))
    overview_text = """
    Nova Titan Systems LLC is a Lubbock-based small business providing comprehensive IT infrastructure, 
    cybersecurity, cloud security, field services, and ICS/OT support to government and commercial clients. 
    We deliver multi-discipline technology solutions with rapid West Texas deployment capabilities and 
    owner-led execution for maximum accountability and responsiveness.
    """
    elements.append(Paragraph(overview_text, body_style))
    elements.append(Spacer(1, 0.1*inch))
    
    # Core Competencies
    elements.append(Paragraph("CORE COMPETENCIES", heading_style))
    
    elements.append(Paragraph("1. Cybersecurity &amp; Cloud Security", subheading_style))
    cyber_text = """
    • Cloud security posture management (CloudWarden platform)<br/>
    • Vulnerability assessments and penetration testing<br/>
    • Security awareness training and phishing simulation<br/>
    • IAM implementation and policy development<br/>
    • Incident response planning and execution
    """
    elements.append(Paragraph(cyber_text, body_style))
    
    elements.append(Paragraph("2. IT Infrastructure &amp; Networking", subheading_style))
    infra_text = """
    • Network design, deployment, and optimization<br/>
    • Server installation and configuration<br/>
    • Firewall setup and policy management<br/>
    • VLAN segmentation and access control<br/>
    • VPN and remote access solutions
    """
    elements.append(Paragraph(infra_text, body_style))
    
    elements.append(Paragraph("3. Field Technical Services", subheading_style))
    field_text = """
    • On-site equipment installation and troubleshooting<br/>
    • Desktop/laptop deployment and imaging<br/>
    • Peripheral setup (printers, scanners, displays)<br/>
    • Break-fix repair and hardware replacement<br/>
    • Cable management and structured wiring
    """
    elements.append(Paragraph(field_text, body_style))
    
    elements.append(Paragraph("4. Telecommunications &amp; ICS/OT Support", subheading_style))
    telecom_text = """
    • VoIP phone system deployment<br/>
    • Unified communications setup<br/>
    • IoT/OT device configuration<br/>
    • Industrial control system security<br/>
    • Legacy system integration
    """
    elements.append(Paragraph(telecom_text, body_style))
    
    elements.append(Paragraph("5. Consulting &amp; Managed Services", subheading_style))
    consulting_text = """
    • IT strategic planning and technology roadmaps<br/>
    • Managed IT support and helpdesk (24/7 available)<br/>
    • Cloud migration and backup solutions<br/>
    • Technology vendor management<br/>
    • Documentation and knowledge transfer
    """
    elements.append(Paragraph(consulting_text, body_style))
    elements.append(Spacer(1, 0.1*inch))
    
    # Differentiators
    elements.append(Paragraph("COMPETITIVE DIFFERENTIATORS", heading_style))
    diff_text = """
    • <b>Multi-discipline service model:</b> Cybersecurity + Infrastructure + Field Services<br/>
    • <b>Rapid West Texas deployment:</b> Lubbock-based with regional coverage<br/>
    • <b>Owner-led execution:</b> Direct accountability, no organizational layers<br/>
    • <b>Micro-purchase readiness:</b> Credit card accepted, fast turnaround<br/>
    • <b>Prime &amp; subcontract flexibility:</b> Experienced in both roles
    """
    elements.append(Paragraph(diff_text, body_style))
    elements.append(Spacer(1, 0.1*inch))
    
    # Representative Projects
    elements.append(Paragraph("REPRESENTATIVE PROJECTS", heading_style))
    
    projects = [
        ['<b>7 Brew</b>', 'POS systems and network deployment for multi-location coffee chain'],
        ['<b>Granite Telecommunications</b>', 'Field engineering services for telecommunications infrastructure'],
        ['<b>NCR / Lexmark</b>', 'Enterprise printer and POS support for nationwide deployments'],
        ['<b>Office Depot / Walmart</b>', 'Retail technology implementation and field service'],
        ['<b>Tagmarshal</b>', 'Golf course IoT system installation and configuration'],
        ['<b>Banks &amp; Schools</b>', 'Network security and infrastructure upgrades'],
        ['<b>CloudWarden IAM</b>', 'Internal SaaS platform development and deployment'],
        ['<b>WorkMarket / Field Nation</b>', 'Nationwide field service contracts for technology deployment'],
    ]
    
    project_table = Table(projects, colWidths=[2*inch, 4*inch])
    project_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1a1a2e')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 4),
        ('RIGHTPADDING', (0, 0), (-1, -1), 4),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cccccc')),
    ]))
    elements.append(project_table)
    elements.append(Spacer(1, 0.15*inch))
    
    # Footer
    footer_text = """
    <b>Business Classification:</b> Small Business | Minority-Owned (Self-Identified)<br/>
    <b>Contract Types:</b> Prime Contractor | Subcontractor | Micro-Purchase Vendor<br/>
    <b>Generated:</b> January 2026
    """
    elements.append(Paragraph(footer_text, body_style))
    
    # Build PDF
    doc.build(elements)
    print(f"✅ PDF generated successfully: {filename}")
    return filename

if __name__ == "__main__":
    create_capability_statement()
