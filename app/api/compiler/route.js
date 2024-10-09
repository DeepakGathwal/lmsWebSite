// 3 api 
import { execSync, spawnSync } from 'child_process';
import fs from 'fs';

import { NextResponse } from "next/server";

// Get All Cources WithOut Category

// Java Compiler
export async function POST(req) {
    const { initalcode } = await req.json()  

try {
    fs.writeFileSync(`cppcompiler.cpp`, initalcode)
   
  } catch (error) {
   return NextResponse.json({ data: `Error writing file: ${error.message}` }, { success: false }, { status: 206 });
  }
const command = `g++ -o cppcompiler cppcompiler.cpp && cppcompiler.exe`;
try {
    const dataBuffer = await execSync(command);
    const data = await  dataBuffer.toString('utf8'); // Convert buffer to string
    return NextResponse.json({ data }, { success: true }, { status: 200 })

} catch (error) {
    return NextResponse.json({ data: error.message }, { success: false }, { status: 206 })
}

}

// Python Compiler
export async function PUT(req) {
    const { initalcode } = await req.json()  
try {
    fs.writeFileSync(`ccompiler.c`, initalcode)
   
  } catch (error) {
   return NextResponse.json({ data: `Error writing file: ${error.message}` }, { success: false }, { status: 206 });
  }
const command = `g++ -o ccompiler ccompiler.c && ccompiler.exe`;
try {
    const dataBuffer = await execSync(command);
    const data = await  dataBuffer.toString('utf8'); // Convert buffer to string
    return NextResponse.json({ data }, { success: true }, { status: 200 })

} catch (error) {
    return NextResponse.json({ data: error.message }, { success: false }, { status: 206 })
}

}