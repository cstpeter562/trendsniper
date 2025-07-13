import { NextResponse } from 'next/server';

export async function GET() {
  const trends = [
    {
      product: "Bluey Doll",
      company: "Disney",
      ticker: "DIS",
      hype: 87,
      description: "Sold out on Target and restocking this weekend. High flip potential for collectors.",
    },
    {
      product: "Labubu Forest Series",
      company: "Pop Mart",
      ticker: "PMRTF",
      hype: 93,
      description: "Massive TikTok haul video went viral. Resale value already doubled.",
    },
    {
      product: "Kaws x Uniqlo Tee",
      company: "Fast Retailing",
      ticker: "FRCOY",
      hype: 78,
      description: "Reddit sleeper pick. Limited drop rumored next Friday.",
    }
  ];

  return NextResponse.json(trends);
}
