import { NextRequest, NextResponse } from 'next/server';
import { createBusinessApplication } from '@/lib/database';
import { BusinessApplicationInsert } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['businessName', 'industry', 'email', 'currentSituation', 'goal'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Transform camelCase to snake_case for database
    const applicationData: BusinessApplicationInsert = {
      business_name: body.businessName,
      industry: body.industry,
      email: body.email.toLowerCase().trim(),
      phone_number: body.phoneNumber?.trim() || null,
      current_situation: body.currentSituation,
      goal: body.goal,
    };

    // Save to database
    const result = await createBusinessApplication(applicationData);

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        data: result
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting application:', error);

    return NextResponse.json(
      {
        error: 'Failed to submit application. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
