import { NextResponse } from 'next/server';
import { EdgeTTS } from '@andresaya/edge-tts';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        if (!body.text) {
            return NextResponse.json(
                { message: 'Text is required' },
                { status: 400 }
            );
        }

        const tts = new EdgeTTS();
        
        // 构建 SSML
        const ssml = `
            <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
                   xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-US">
                <voice name="en-US-JennyNeural">
                    <prosody rate="+0%" pitch="+0Hz">
                        ${body.text}
                    </prosody>
                </voice>
            </speak>
        `.trim();

        const audioData = await tts.synthesize({
            ssml,
            format: 'audio-24khz-48kbitrate-mono-mp3'
        });

        // 返回音频数据
        return new NextResponse(audioData, {
            headers: {
                'Content-Type': 'audio/mp3',
                'Content-Length': audioData.length.toString(),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    } catch (error) {
        console.error('TTS Error:', error);
        return NextResponse.json(
            { 
                message: 'Error generating speech', 
                error: error instanceof Error ? error.message : String(error)
            },
            { 
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );
    }
}

export async function OPTIONS(request: Request) {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
} 