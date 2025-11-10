// ============================================
// NEXT.JS APP ROUTER INTEGRATION
// ============================================

// File: app/page.tsx
import FreeWebsiteOffer from './free-website-offer';

export const metadata = {
  title: 'Get a Free Professional Website | Your Name',
  description: 'I\'m giving away 10 custom-designed static websites to qualified businesses. Built with React/Next.js, lightning-fast, mobile-responsive.',
  keywords: 'free website, web design, small business website, professional website',
  openGraph: {
    title: 'Get a Free Professional Website',
    description: 'Professional website, completely free. Only 10 spots available.',
    images: ['/og-image.jpg'], // Add your OG image
  }
};

export default function Home() {
  return <FreeWebsiteOffer />;
}


// ============================================
// NEXT.JS PAGES ROUTER INTEGRATION
// ============================================

// File: pages/index.tsx
import Head from 'next/head';
import FreeWebsiteOffer from '../components/free-website-offer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Get a Free Professional Website | Your Name</title>
        <meta name="description" content="I'm giving away 10 custom-designed static websites to qualified businesses." />
        <meta property="og:title" content="Get a Free Professional Website" />
        <meta property="og:description" content="Professional website, completely free. Only 10 spots available." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FreeWebsiteOffer />
    </>
  );
}


// ============================================
// STANDALONE REACT APP INTEGRATION
// ============================================

// File: src/App.tsx
import FreeWebsiteOffer from './components/free-website-offer';
import './globals.css';

function App() {
  return <FreeWebsiteOffer />;
}

export default App;


// ============================================
// WITH GOOGLE ANALYTICS
// ============================================

// File: app/layout.tsx (for App Router)
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" /> {/* Replace with your GA ID */}
      </body>
    </html>
  );
}


// ============================================
// FORM SUBMISSION - EMAIL INTEGRATION
// ============================================

// File: app/api/submit-application/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Configure email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email to you
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: 'your-email@domain.com',
    subject: `New Website Application: ${data.businessName}`,
    html: `
      <h2>New Application Received</h2>
      <p><strong>Business:</strong> ${data.businessName}</p>
      <p><strong>Industry:</strong> ${data.industry}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Current Situation:</strong> ${data.currentSituation}</p>
      <p><strong>Goal:</strong> ${data.goal}</p>
      <p><strong>Revenue:</strong> ${data.monthlyRevenue}</p>
    `,
  });

  // Confirmation email to applicant
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: data.email,
    subject: 'Application Received - Free Website Offer',
    html: `
      <h2>Thanks for applying, ${data.businessName}!</h2>
      <p>I've received your application and will review it within 24 hours.</p>
      <p>If you're approved, I'll reach out to schedule a quick discovery call.</p>
      <p>Best regards,<br>Your Name</p>
    `,
  });

  return NextResponse.json({ success: true });
}

// Then update the handleSubmit in free-website-offer.jsx:
// const response = await fetch('/api/submit-application', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(formData)
// });


// ============================================
// FORM SUBMISSION - GOOGLE SHEETS
// ============================================

// 1. Create Google Apps Script:
// Go to script.google.com, create new project, paste:

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.businessName,
    data.industry,
    data.email,
    data.currentSituation,
    data.goal,
    data.monthlyRevenue
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

// 2. Deploy as web app, copy URL
// 3. Update handleSubmit in free-website-offer.jsx:

// const response = await fetch('YOUR_GOOGLE_SCRIPT_URL', {
//   method: 'POST',
//   body: JSON.stringify(formData)
// });


// ============================================
// FORM SUBMISSION - AIRTABLE
// ============================================

// File: app/api/submit-application/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  
  const response = await fetch('https://api.airtable.com/v0/YOUR_BASE_ID/Applications', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        'Business Name': data.businessName,
        'Industry': data.industry,
        'Email': data.email,
        'Current Situation': data.currentSituation,
        'Goal': data.goal,
        'Revenue': data.monthlyRevenue,
        'Status': 'New'
      }
    })
  });

  return NextResponse.json({ success: true });
}


// ============================================
// DYNAMIC SPOTS COUNTER
// ============================================

// File: app/api/spots-remaining/route.ts
import { kv } from '@vercel/kv'; // Or use any database

export async function GET() {
  const spots = await kv.get('spots-remaining') || 10;
  return NextResponse.json({ spotsLeft: spots });
}

export async function POST() {
  const current = await kv.get('spots-remaining') || 10;
  const newValue = Math.max(0, current - 1);
  await kv.set('spots-remaining', newValue);
  return NextResponse.json({ spotsLeft: newValue });
}

// Then update free-website-offer.jsx:
// useEffect(() => {
//   fetch('/api/spots-remaining')
//     .then(res => res.json())
//     .then(data => setSpotsLeft(data.spotsLeft));
// }, []);


// ============================================
// ENVIRONMENT VARIABLES
// ============================================

// File: .env.local
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
AIRTABLE_API_KEY=keyXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX


// ============================================
// VERCEL DEPLOYMENT
// ============================================

// File: vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "framework": "nextjs",
  "env": {
    "SMTP_HOST": "@smtp-host",
    "SMTP_USER": "@smtp-user",
    "SMTP_PASS": "@smtp-pass"
  }
}

// Deploy commands:
// npm i -g vercel
// vercel
// vercel --prod


// ============================================
// QUICK TIPS
// ============================================

/*
1. Test locally first:
   npm run dev

2. Test form submissions:
   - Fill out form
   - Check console for errors
   - Verify email/database received data

3. Mobile testing:
   - Use real devices, not just DevTools
   - Test on iPhone and Android
   - Check form inputs work properly

4. Performance:
   - Run Lighthouse audit
   - Optimize images
   - Check bundle size

5. Analytics:
   - Track form opens
   - Track form submissions
   - Track which sections get most views
*/
