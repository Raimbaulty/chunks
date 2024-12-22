import React from 'react';
import styles from './ChunkCard.module.css';

const ChunkCard = ({ chunk }) => {
    const playAudio = async () => {
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: chunk.chunk }),
            });
            
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } catch (error) {
            console.error('Error playing audio:', error);
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