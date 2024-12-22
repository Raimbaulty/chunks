import React from 'react';
import styles from './ChunkCard.module.css';
import type { Chunk } from '@/services/chunkService';

interface ChunkProps {
    chunk: Chunk;
}

const ChunkCard: React.FC<ChunkProps> = ({ chunk }) => {
    const playAudio = () => {
        try {
            // 检查浏览器是否支持 Speech Synthesis
            if (!window.speechSynthesis) {
                throw new Error('Your browser does not support speech synthesis');
            }

            // 停止任何正在进行的语音
            window.speechSynthesis.cancel();

            // 创建语音实例
            const utterance = new SpeechSynthesisUtterance(chunk.chunk);
            
            // 设置语音参数
            utterance.lang = 'en-US';  // 设置语言
            utterance.rate = 0.8;      // 语速设置为 0.8
            utterance.pitch = 1;       // 音高 (0 到 2)
            utterance.volume = 1;      // 音量 (0 到 1)

            // 播放语音
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            console.error('Speech synthesis error:', error);
            alert('语音播放失败，请检查浏览器设置');
        }
    };

    return (
        <div className={styles.card} onClick={playAudio}>
            <h3 className={styles.chunk}>{chunk.chunk}</h3>
            <p className={styles.pronunciation}>{chunk.pronunciation}</p>
            <p className={styles.meaning}>{chunk.chinese_meaning}</p>
            <div className={styles.scenes}>
                {chunk.suitable_scenes.map((scene, index) => (
                    <span key={index} className={styles.scene}>
                        {scene}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ChunkCard; 