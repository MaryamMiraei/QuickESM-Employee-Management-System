import serverApi from "@/lib/serverAPI";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}
export const PUT = async (request: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data } = await serverApi.put(`/employees/${id}`, body);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Failed to update employee" },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: Request, { params }: RouteParams) => {
  try {
    const { id } = await params;

    await serverApi.delete(`/employees/${id}`);

    return NextResponse.json({
      message: "Employee deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete employee" },
      { status: 500 },
    );
  }
};
