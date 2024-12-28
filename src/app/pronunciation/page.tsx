'use client';

import React, { useState, useRef } from 'react';
import styles from './page.module.css';

const commonSentences = [
    {
        text: "I'd like a **cup of coffee**, please.",
        translation: "我想要一杯咖啡，谢谢。",
        focus: "注意 'd like 的连读和 coffee 的重音",
        context: "在咖啡店点餐",
        formality: "通用",
        emphasis: ["cup of coffee"]
    },
    {
        text: "**Could you** repeat that, please?",
        translation: "请您再说一遍好吗？",
        focus: "注意 Could you 的弱读，通常发音类似 'Cud ya'",
        context: "听不清对方说话时",
        formality: "礼貌正式",
        emphasis: ["Could you"]
    },
    {
        text: "**What do you do** for a living?",
        translation: "你是做什么工作的？",
        focus: "注意 What do you 的连读，通常发音类似 'Whaddya'",
        context: "初次见面社交场合",
        formality: "通用",
        emphasis: ["What do you do"]
    },
    {
        text: "**Nice to meet** you!",
        translation: "很高兴见到你！",
        focus: "注意 Nice to 的连读，meet 的重音",
        context: "初次见面",
        formality: "通用",
        emphasis: ["Nice to meet"]
    },
    {
        text: "I'm **gonna** go to the **movies**.",
        translation: "我要去看电影。",
        focus: "注意 gonna 是 going to 的口语形式，movies 的重音在第一个音节",
        context: "日常对话",
        formality: "非正式",
        emphasis: ["gonna", "movies"]
    },
    {
        text: "**Would you mind** if I opened the window?",
        translation: "介意我开一下窗户吗？",
        focus: "注意 Would you 的连读，mind 的语调上扬",
        context: "请求许可",
        formality: "正式礼貌",
        emphasis: ["Would you mind"]
    },
    {
        text: "**What's up** with you?",
        translation: "你最近怎么样？",
        focus: "注意 What's up 的连读，通常发音类似 'Wassup'",
        context: "朋友间打招呼",
        formality: "非常非正式",
        emphasis: ["What's up"]
    },
    {
        text: "I **should've** done it earlier.",
        translation: "我早该做这件事的。",
        focus: "注意 should've 的缩读，不要发成 should of",
        context: "表达后悔",
        formality: "通用",
        emphasis: ["should've"]
    }
];

export default function PronunciationPage() {
    const [recordings, setRecordings] = useState<{[key: number]: string}>({});
    const [recordingIndex, setRecordingIndex] = useState<number | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const startRecording = async (index: number) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setRecordings(prev => ({
                    ...prev,
                    [index]: url
                }));
            };

            mediaRecorder.current.start();
            setRecordingIndex(index);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('无法访问麦克风，请确保已授予权限。');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && recordingIndex !== null) {
            mediaRecorder.current.stop();
            setRecordingIndex(null);
            mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const playEdgeTTS = (text: string) => {
        const savedSettings = localStorage.getItem('userSettings');
        let voice = 'en-US-JennyNeural';
        let speed = 1.0;

        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                voice = settings.voice || voice;
                speed = settings.speed || speed;
            } catch (error) {
                console.error('Error parsing settings:', error);
            }
        }

        const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*/g, ''));
        utterance.lang = 'en-US';
        utterance.rate = speed;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.voice = window.speechSynthesis.getVoices().find(v => v.name === voice) || null;
        window.speechSynthesis.speak(utterance);
    };

    const renderText = (text: string, emphasisWords: string[]) => {
        let result = text;
        emphasisWords.forEach(word => {
            const pattern = new RegExp(`\\*\\*(${word})\\*\\*`, 'g');
            result = result.replace(pattern, (_, p1) => `<a href="https://youglish.com/pronounce/${encodeURIComponent(p1)}" target="_blank" class="${styles.emphasisLink}">${p1}</a>`);
        });
        return <div dangerouslySetInnerHTML={{ __html: result }} />;
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>发音纠错练习</h1>
            <p className={styles.description}>
                选择句子练习发音，点击加粗部分可以查看更多发音示例。
            </p>

            <div className={styles.sentenceList}>
                {commonSentences.map((sentence, index) => (
                    <div key={index} className={styles.sentenceCard}>
                        <div className={styles.sentenceHeader}>
                            <div className={styles.sentenceText}>
                                {renderText(sentence.text, sentence.emphasis)}
                            </div>
                            <div className={styles.controls}>
                                <button 
                                    className={styles.playButton}
                                    onClick={() => playEdgeTTS(sentence.text)}
                                >
                                    播放标准发音
                                </button>
                                <button 
                                    className={`${styles.recordButton} ${recordingIndex === index ? styles.recording : ''}`}
                                    onClick={() => recordingIndex === index ? stopRecording() : startRecording(index)}
                                >
                                    {recordingIndex === index ? '停止录音' : '开始录音'}
                                </button>
                            </div>
                        </div>
                        <div className={styles.translation}>{sentence.translation}</div>
                        <div className={styles.focus}>{sentence.focus}</div>
                        <div className={styles.context}>
                            <span className={styles.label}>使用场景：</span>
                            {sentence.context}
                        </div>
                        <div className={styles.formality}>
                            <span className={styles.label}>正式程度：</span>
                            {sentence.formality}
                        </div>
                        {recordings[index] && (
                            <div className={styles.audioPlayback}>
                                <audio src={recordings[index]} controls />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 