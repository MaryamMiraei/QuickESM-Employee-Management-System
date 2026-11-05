import serverApi from "@/lib/serverAPI";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { data } = await serverApi.get("/employees");

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch employees" },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { data } = await serverApi.post("/employees", body);

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Failed to add employee" },
      { status: 500 },
    );
  }
};
