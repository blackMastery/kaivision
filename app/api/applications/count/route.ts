import { NextResponse } from 'next/server';
import { getApprovedApplicationsCount } from '@/lib/database';

export async function GET() {
  try {
    const count = await getApprovedApplicationsCount();

    return NextResponse.json(
      {
        success: true,
        count,
        spotsLeft: Math.max(10 - count, 0)
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching approved applications count:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch count',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
