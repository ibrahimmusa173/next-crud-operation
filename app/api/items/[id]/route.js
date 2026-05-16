import dbConnect from "@/lib/mongodb";
import Item from "@/models/Item";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    // In Next.js 15, params is a Promise. You MUST await it.
    const { id } = await params; 
    
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}