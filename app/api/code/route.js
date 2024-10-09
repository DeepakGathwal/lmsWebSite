import { executeQuery } from "@/conn/conn";
import { JSDOM } from 'jsdom';
import { execSync, spawnSync } from 'child_process';
import fs from 'fs';
import { client } from "@/middelware/redisFile";
import { NextResponse } from "next/server";

// Get All Courses Without Category
export async function POST(req) {
    const { chapter, topic, code } = await req.json();
  
    // const redisdata = await client.get(`${chapter + topic + code}`);
    // if (!redisdata) {
        // Query to get HTML content
        const query = `
        SELECT tutorial_html 
        FROM jtc_tutorials_topics 
        WHERE cource_id = (
            SELECT id 
            FROM jtc_tutorial_cources 
            WHERE deleted_by = '0' AND link = "${chapter}"
        ) 
        AND link = "${topic}" 
        AND deleted_by = '0'
    `;

        const executeApi = await executeQuery(query);

        if (executeApi.length > 0) {
            const getCode = executeApi[0].tutorial_html;

            const dom = new JSDOM(getCode);
            
            const elements = dom.window.document.getElementsByClassName('codebg');
            
            
            let data = '';
            
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                
                if (element.textContent.includes(code)) {
  

                    let text = element.innerHTML;
            
                    // Replace <br> and <p> tags with newline characters
                    text = text.replace(/<br\s*\/?>/gi, '\n')
                               .replace(/<\/p>/gi, '\n\n')
                               .replace(/<p>/gi, '\n');
            
                    // Remove remaining HTML tags
                    text = text.replace(/<\/?[^>]+(>|$)/g, "");
            
                    // Replace the code snippet with space
                    text = text.replace(code, ' ');
            
                    // Trim and add to accumulator
                    data += text.trim() + '\n\n'; // Ensure spacing between elements
                }
            }

            const value = JSON.stringify(data.trim()); // Trim final data
            await client.set(`${chapter + topic + code}`, value, {
                EX: process.env.REDIS_EXP,
                NX: true
            });
            return NextResponse.json({ data }, { success: true }, { status: 200 });
        // } else {
        //     return NextResponse.json({ message: "Code Not Found" }, { success: false }, { status: 206 });
        // }
    } else {
        const value = await JSON.parse(redisdata)
        return NextResponse.json({ data: value }, { success: true }, { status: 200 })
    }

}


// Java Compiler
export async function PATCH(req) {
    const { initalcode, commandLineinput, getInput } = await req.json()

    let createClassName = ''
    const findName = initalcode.split(/public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*/)[0];
    const reversedString = findName.split('').reverse().join('');
    const removeCurly = reversedString.split('ssalc')[0].replace('{', '').trim()
    const newClassName = removeCurly.split('').reverse().join('');

    if (newClassName.match(/\n/g) == null) {

        createClassName = newClassName.trim()
    } else {

        const findClassName = newClassName.substring(0, newClassName.indexOf('{'))

        createClassName = findClassName.trim()
    }

    try {
        fs.writeFileSync(`${createClassName}.java`, initalcode);
    } catch (error) {
        return NextResponse.json({ data: `error to execute that code ${initalcode}` }, { success: true }, { status: 200 })
    }

    try {

        let input = ''
        if (getInput) {
            if (getInput.includes(',')) {
                input = getInput.replaceAll(',', ' ');
            } else {
                input = getInput;
            }
        }
        // Execu
        const data = execSync(`javac ${createClassName}.java && java ${createClassName}  ${commandLineinput ? `${commandLineinput}` : ''}`, { input: `${input}`, encoding: 'utf8', stdio: 'pipe' });

        if (data.includes(`${createClassName}.java`)) return NextResponse.json({ data }, { success: true }, { status: 200 })

        // Convert buffer to string
        else return NextResponse.json({ data }, { success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ data: error.message }, { success: false }, { status: 206 })

    } finally {
        await Promise.all([
            fs.unlinkSync(`${createClassName}.java`),
            fs.existsSync(`${createClassName}.class`) && fs.unlinkSync(`${createClassName}.class`)
        ]);
    }
}



// Python Compiler
export async function PUT(req) {
    const { initalcode, getInput } = await req.json()
    let input = ''
    if (getInput) {
        if (getInput.includes(',')) input = getInput.replaceAll(",", '\n');
        else input = `${getInput}`
    }

    // Execute Python script synchronously
    const pythonProcess = spawnSync('python', ['-c', initalcode], { input: input, encoding: 'utf8', stdio: 'pipe' });

    // Handle output
    if (pythonProcess.stdout && pythonProcess.stdout.length > 0) {

        return NextResponse.json({ data: pythonProcess }, { success: true }, { status: 200 });
    }

    // Handle errors
    if (pythonProcess.stderr && pythonProcess.stderr.length > 0) {
        return NextResponse.json({ data: pythonProcess }, { success: false }, { status: 500 });
    }

    // Handle process exit
    if (pythonProcess.status !== 0) {
        return NextResponse.json({ data: 'Python process exited with non-zero status' }, { success: false }, { status: 500 });
    }

    // If no output, error, or non-zero exit status, assume success
    return NextResponse.json({ data: 'Python script executed successfully' }, { success: true }, { status: 200 });
}
